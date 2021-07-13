Promise Throttle All

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

##### Returns

`Promise`<`T`\>

#### Defined in

[index.ts:1](https://github.com/robinpokorny/promise-throttle-all/blob/b09c7b6/src/index.ts#L1)

## Functions

### throttleAll

▸ `Const` **throttleAll**<`T`\>(`limit`, `tasks`): `Promise`<`T`[]\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | `number` |
| `tasks` | [`Task`](README.md#task)<`T`\>[] |

#### Returns

`Promise`<`T`[]\>

#### Defined in

[index.ts:5](https://github.com/robinpokorny/promise-throttle-all/blob/b09c7b6/src/index.ts#L5)
