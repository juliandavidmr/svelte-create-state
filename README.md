# Svelte create state _[in progress]_

[useState](https://reactjs.org/docs/hooks-state.html) (from React) but for [Svelte](https://svelte.dev/).

## Getting started

### Install

```bash
npm i svelte-create-state
```

### Usage

#### Basic

```ts
import { createState } from "svelte-create-state";

const [getCounter, setCounter] = createState(0);

setCounter(5)
getCounter() // 5

setCounter(n => n + 1)
getCounter() // 6
```

#### Subscribe changes

```ts
const [getStuff, setStuff, { subscribe }] = createState('chair');

subscribe(stuff => {
    console.log(stuff);
    // Log initial value: chair
    // Log second value: table
});

setStuff('table')
```

#### Svelte real example

```html
<script>
  import { createState } from "svelte-create-state";

  const [getCount, setCount, { state: count }] = createState(0);

  function increment() {
    setCount(count => count + 1);
  }

  function decrement() {
    setCount(count => count - 1);
  }

  function logCurrentState() {
    console.log(getCount(), 'or', $count);
  }
</script>

<div>
  <div>
    <button on:click={increment}>+</button>
    {$count}
    <button on:click={decrement}>-</button>
  </div>
  <button on:click={logCurrentState}>Log state</button>
</div>
```

## Contributing

### Clone repository

To clone the repository use the following commands:

```sh
git clone https://github.com/juliandavidmr/svelte-create-state
cd svelte-create-state
npm install
```

### Available Scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `build:watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests

## Additional Information

### Writing tests in JavaScript

Writing unit tests in TypeScript can sometimes be troublesome and confusing. Especially when mocking dependencies and using spies.

## License

Licensed under the MIT. See the [LICENSE](./LICENSE) file for details.
