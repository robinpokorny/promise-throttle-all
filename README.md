# 🤏 Promise Throttle All
> Promise.all with limited concurrency

[![CI][gh-image]][gh-url]
[![license][license-image]][license-url]
[![Library minified size][bundlephobia-image]][bundlephobia-url]
[![git3moji][git3moji-image]][git3moji-url]
![typescript][ts-image]
[![buy-me-a-coffee][coffee-image]][coffee-url]

Limit in-progress async operations, like running only few API requests at a time

## Quick use

```ts
import { throttleAll } from 'promise-throttle-all'

// task1 takes 100ms to complete
const task1 = () => new Promise((resolve) => {
  setTimeout(resolve, 100, 1);
});

const task2 = () => Promise.resolve(2);

// Limit concurently running promises to 1
throttleAll(1, [task1, task2])
  .then((values) => { console.log(values) });
// task2 will run after task1 finishes
// logs: `[1, 2]`
```

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install promise-throttle-all --save

# For Yarn, use the command below.
yarn add promise-throttle-all
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/promise-throttle-all"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/promise-throttle-all"></script>

<script>
  // UMD module is exposed through the "promiseThrottleAll" global variable.
  console.log(promiseThrottleAll);
</script>
```

## Documentation

[Documentation generated from source files by Typedoc](./docs/README.md).

## License

Released under [MIT License](./LICENSE).


<!-- Markdown link & img dfn's -->
[gh-image]: https://img.shields.io/github/workflow/status/robinpokorny/promise-throttle-all/CI?logo=github&style=flat-square
[gh-url]: https://github.com/robinpokorny/promise-throttle-all/actions/workflows/main.yml
[license-image]: https://img.shields.io/github/license/robinpokorny/promise-throttle-all?style=flat-square
[license-url]: https://github.com/robinpokorny/promise-throttle-all/blob/master/LICENSE
[git3moji-image]: https://img.shields.io/badge/git3moji-%E2%9A%A1%EF%B8%8F%F0%9F%90%9B%F0%9F%93%BA%F0%9F%91%AE%F0%9F%94%A4-fffad8.svg?style=flat-square
[git3moji-url]: https://robinpokorny.github.io/git3moji/
[ts-image]: https://img.shields.io/badge/types-TypeScript-blue?style=flat-square
[coffee-url]: https://www.buymeacoffee.com/robinpokorny
[coffee-image]: https://img.shields.io/badge/%20-Buy%20me%20a%20coffee-FF813F?style=flat-square&logo=buy-me-a-coffee&labelColor=FF813F&logoColor=white
[bundlephobia-image]: https://img.shields.io/bundlephobia/min/promise-throttle-all?style=flat-square
[bundlephobia-url]: https://bundlephobia.com/result?p=promise-throttle-all
