/**
 * A Task is a nullary function that returns a promise
 */
export type Task<T> = () => Promise<T>

const notSettled = Symbol(`not-settled`)

/**
 * Run tasks with limited concurency.
 * @param limit - Limit of tasks that run at once.
 * @param tasks - List of tasks to run.
 * @returns A promise that fulfills to an array of the results
 * of the input promises or rejects immediately upon any of
 * the input tasks rejecting.
 * @example
 * ```ts
 * const task1 = () => new Promise((resolve) => {
 *   setTimeout(resolve, 100, 1);
 * });
 * const task2 = () => Promise.resolve(2);
 *
 * throttleAll(1, [task1, task2])
 *   .then((values) => { console.log(values) });
 * // task2 will run after task1 finishes
 * // logs: `[1, 2]`
 * ```
 */
export const throttleAll = <T>(
  limit: number,
  tasks: Task<T>[],
): Promise<T[]> => {
  if (!Number.isInteger(limit) || limit < 1) {
    throw new TypeError(
      `Expected \`limit\` to be a finite number > 0, got \`${limit}\` (${typeof limit})`,
    )
  }

  if (
    !Array.isArray(tasks) ||
    !tasks.every((task) => typeof task === `function`)
  ) {
    throw new TypeError(
      `Expected \`tasks\` to be a list of functions returning a promise`,
    )
  }

  return new Promise<T[]>((resolve, reject) => {
    const result: (T | symbol)[] = Array(tasks.length).fill(notSettled)

    const entries = tasks.entries()

    const next = () => {
      const { done, value } = entries.next()

      if (done) {
        const isLast = !result.includes(notSettled)

        if (isLast) resolve(result as T[])

        return
      }

      const [index, task] = value

      const onFulfilled = (x: T) => {
        result[index] = x
        next()
      }

      task().then(onFulfilled, reject)
    }

    // Run next() `limit` times
    Array(limit).fill(0).forEach(next)
  })
}
