export type Task<T> = () => Promise<T>

const notSettled = Symbol(`not-settled`)

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

    Array(limit).fill(0).forEach(next)
  })
}
