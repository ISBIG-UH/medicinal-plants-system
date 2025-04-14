# 🧪 Testing

Testing paints a clear picture on the state of the application and provides the team with valuable information to make informed decisions during the software development cycle.

## ⚗️ Types of tests

### Unit Tests

Unit tests are the smallest tests you can write. They test individual parts of your application in isolation. They are useful for testing shared components and functions that are used throughout the entire application. They are also useful for testing complex logic in a single component. They are fast to run and easy to write.

[Unit Test Example Code]()

## :microscope: ​Tooling

#### [Vitest](https://vitest.dev/)

Vitest is a testing framework with features similar to Jest, but it's more up-to-date and works well with modern tools like Vite. It's highly customizable and flexible, making it a popular option for testing JavaScript/TypeScript code. This tool can be configured in the `vite.config.ts` and the base environment to run the tests ins configured in `src/test/setup.ts`.

Notice that in order to test visual components it is necessary to run the tests on a browser-like environment that can generate the DOM of the document. We selected [happy-dom](https://github.com/capricorn86/happy-dom) which is a headless browser implemented in JavaScript and that can be integrated with Vite very easily.

## ✅ Conventions

- All files containing tests must be named like `my-feature-test.{test, spec}.{ts, tsx}`

- The `test` folder should contain only utilities that are shared across the actual tests

- Keep the tests within the same folder of the component or function inside a `__tests__`  folder. For example:

  ```
  components/
  ┣ __tests__/
  ┃ ┣ my-component.test.tsx
  ┃ ┗ my-other-component.test.tsx
  ┣ my-component.tsx
  ┗ my-other-component.tsx
  ```

