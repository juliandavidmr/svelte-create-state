# Svelte create state

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

## FAQ

**What does calling createState do?**

It declares a “state variable”. Our variable is called getCount but we could call it anything else, like getBanana. This is a way to “preserve” some values between the function calls — createState is a new way to use the exact same capabilities that `writable` provides in a svelte component.

**What do we pass to createState as an argument?**

The only argument to the createState() Hook is the initial state. The state doesn’t have to be an object. We can keep a number or a string if that’s all we need. In our example, we just want a number for how many times the user clicked, so pass 0 as initial state for our variable.

**What does createState return?**

It returns a pair of values: the current state and a function that updates it. This is why we write `const [getCount, setCount] = createState(0)`. This is similar to `writable(0)`, except you get them in a pair. If you’re not familiar with the syntax we used, read the next question.

**What Do Square Brackets Mean?**

You might have noticed the square brackets when we declare a state variable:


```ts
const [getCount, setCount] = createState(0);
```

The names on the left aren’t a part of the `svelte-create-state` or `svelte`. You can name your own state variables:

```ts
const [getFruit, setFruit] = createState('banana');
```

This JavaScript syntax is called “array destructuring”. It means that we’re making two new variables fruit and setFruit, where fruit is set to the first value returned by createState, and setFruit is the second. It is equivalent to this code:

```ts
var fruitStateVariable = createState('banana'); // Returns a pair
var getFruit = fruitStateVariable[0]; // First item in a pair
var setFruit = fruitStateVariable[1]; // Second item in a pair
```

When we declare a state variable with createState, it returns a pair — an array with two items. The first item is the current value, and the second is a function that lets us update it. Using [0] and [1] to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

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
