# Promise Throttle All

## Table of contents

### Type aliases

- [Task](README.md#task)

### Functions

- [throttleAll](README.md#throttleall)

## Type aliases

### Task

Ƭ **Task**<`T`\>: () => `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (): `Promise`<`T`\>

A Task is a nullary function that returns a promise

##### Returns

`Promise`<`T`\>

#### Defined in

[index.ts:4](https://github.com/robinpokorny/promise-throttle-all/blob/main/src/index.ts#L4)

## Functions

### throttleAll

▸ **throttleAll**<`T`\>(`limit`, `tasks`): `Promise`<`T`[]\>

Run tasks with limited concurency.

**`example`**
```ts
const task1 = () => new Promise((resolve) => {
  setTimeout(resolve, 100, 1);
});
const task2 = () => Promise.resolve(2);

throttleAll(1, [task1, task2])
  .then((values) => { console.log(values) });
// task2 will run after task1 finishes
// logs: `[1, 2]`
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit` | `number` | Limit of tasks that run at once. |
| `tasks` | [`Task`](README.md#task)<`T`\>[] | List of tasks to run. |

#### Returns

`Promise`<`T`[]\>

A promise that fulfills to an array of the results
of the input promises or rejects immediately upon any of
the input tasks rejecting.

#### Defined in

[index.ts:28](https://github.com/robinpokorny/promise-throttle-all/blob/main/src/index.ts#L28)
