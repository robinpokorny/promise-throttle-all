export type Task<T> = () => Promise<T>

export const throttleAll = <T>(limit: number, tasks: Task<T>[]): Promise<T[]> =>
  new Promise<T[]>((resolve, reject) => {
    const notSettled = Symbol('not-settled')

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
