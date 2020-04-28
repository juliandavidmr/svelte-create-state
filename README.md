# Svelte create state _[in progress]_

👩🏻‍💻 Developer Ready: [useState](https://reactjs.org/docs/hooks-state.html) 
(from React) but for [Svelte](https://svelte.dev/).

```ts
import { createState } from "svelte-create-state";

const [getCounter, setCounter] = createState(0);

setCounter(5)
getCounter() // 5

setCounter(n => n + 1)
getCounter() // 6
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
