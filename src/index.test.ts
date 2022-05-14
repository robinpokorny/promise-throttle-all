/* eslint-disable @typescript-eslint/ban-ts-comment */
import { throttleAll } from '../src'
import util from 'util'

// Make sure all Promises had time to run
const flush = () => new Promise((resolve) => setImmediate(resolve))

const isPending = (promise: Promise<unknown>) =>
  util.inspect(promise).includes(`<pending>`)

// Create a Promise that can be resolved from outside
const createPromise = () => {
  let resolver: (value: unknown) => void
  let rejecter: (value: unknown) => void

  const promise = new Promise((resolve, reject) => {
    resolver = resolve
    rejecter = reject
  })

  // @ts-ignore
  return { promise, resolver, rejecter }
}

test(`runs tasks in order with concurency limit`, async () => {
  const promises = Array(6).fill(0).map(createPromise)
  const tasks = promises.map(({ promise }) =>
    jest.fn().mockReturnValueOnce(promise),
  )

  const result = throttleAll(2, tasks)

  expect(tasks[0]).toHaveBeenCalled()
  expect(tasks[1]).toHaveBeenCalled()
  expect(tasks[2]).not.toHaveBeenCalled()
  expect(tasks[3]).not.toHaveBeenCalled()
  expect(tasks[4]).not.toHaveBeenCalled()
  expect(tasks[5]).not.toHaveBeenCalled()

  promises[0]?.resolver(0)

  await flush()

  expect(tasks[2]).toHaveBeenCalled()
  expect(tasks[3]).not.toHaveBeenCalled()
  expect(tasks[4]).not.toHaveBeenCalled()
  expect(tasks[5]).not.toHaveBeenCalled()

  promises[1]?.resolver(1)
  promises[2]?.resolver(2)

  await flush()

  expect(tasks[3]).toHaveBeenCalled()
  expect(tasks[4]).toHaveBeenCalled()
  expect(tasks[5]).not.toHaveBeenCalled()

  promises[4]?.resolver(4)

  await flush()

  expect(isPending(result)).toBeTruthy()

  expect(tasks[5]).toHaveBeenCalled()

  promises[3]?.resolver(3)
  promises[5]?.resolver(5)

  await flush()

  expect(isPending(result)).toBeFalsy()

  await expect(result).resolves.toEqual([0, 1, 2, 3, 4, 5])
})

test(`any promise can finish last`, async () => {
  const promises = Array(4).fill(0).map(createPromise)
  const tasks = promises.map(({ promise }) =>
    jest.fn().mockReturnValueOnce(promise),
  )

  const result = throttleAll(2, tasks)

  promises[1]?.resolver(1)
  promises[2]?.resolver(2)
  promises[3]?.resolver(3)

  await flush()

  expect(isPending(result)).toBeTruthy()

  promises[0]?.resolver(0)

  await flush()

  expect(isPending(result)).toBeFalsy()

  await expect(result).resolves.toEqual([0, 1, 2, 3])
})

test(`works with limit greater that the number of tasks`, async () => {
  const promises = Array(2).fill(0).map(createPromise)
  const tasks = promises.map(
    ({ promise }) =>
      () =>
        promise,
  )

  const result = throttleAll(10, tasks)

  promises[0]?.resolver(0)
  promises[1]?.resolver(1)

  await flush()

  expect(isPending(result)).toBeFalsy()

  await expect(result).resolves.toEqual([0, 1])
})

test(`rejects when the first promise rejects`, async () => {
  const promises = Array(2).fill(0).map(createPromise)
  const tasks = promises.map(
    ({ promise }) =>
      () =>
        promise,
  )

  const result = throttleAll(2, tasks)

  // magic line without which the test does not run ¯\_(ツ)_/¯
  result.catch((x) => x)

  promises[1]?.rejecter(1)

  await flush()

  expect(isPending(result)).toBeFalsy()

  await expect(result).rejects.toEqual(1)
})

test(`throws type error if limit is not an integer`, async () => {
  expect(() => throttleAll(2.5, [])).toThrowErrorMatchingInlineSnapshot(
    `"Expected \`limit\` to be a finite number > 0, got \`2.5\` (number)"`,
  )
  expect(() => throttleAll(-2, [])).toThrowErrorMatchingInlineSnapshot(
    `"Expected \`limit\` to be a finite number > 0, got \`-2\` (number)"`,
  )
  expect(() => throttleAll(Infinity, [])).toThrowErrorMatchingInlineSnapshot(
    `"Expected \`limit\` to be a finite number > 0, got \`Infinity\` (number)"`,
  )
  // @ts-ignore
  expect(() => throttleAll(``, [])).toThrowErrorMatchingInlineSnapshot(
    `"Expected \`limit\` to be a finite number > 0, got \`\` (string)"`,
  )
})

test(`throws type error if not passed tasks`, async () => {
  expect(() =>
    // @ts-ignore
    throttleAll(2, [Promise.resolve(1)]),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Expected \`tasks\` to be a list of functions returning a promise"`,
  )
})
