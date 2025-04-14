# 📐 Project Standards

Enforcing project standards is crucial for maintaining code quality, consistency, and scalability in a React application. By establishing and adhering to a set of best practices, developers can ensure that the codebase remains clean, organized, and easy to maintain.

## :hammer: Tooling

### Linting & [ESLint](https://eslint.org/)

A **linter** is a tool that analyzes code for potential errors, stylistic issues, and best practice violations helping developers in maintaining code quality and adhering to coding standards. **ESLint** is a linting tool for JavaScript/TypeScript that can be customized by configuring rules in the `eslint.config.js` file and, due to its big community there are multiple plugins available to add the most common best practices and standards, e.g. [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn). This approach not only helps in catching mistakes early but also enforces uniformity in coding practices, making code reviews easier and development faster and more reliable.

ESLint doesn't come bundled by default in Vite so we need to [install](https://github.com/gxmari007/vite-plugin-eslint) and bundle it manually.

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react(), eslint()],
})
```

ESLint can also be integrated with VS Code using an [extension](https://marketplace.visualstudio.com/items/?itemName=dbaeumer.vscode-eslint), in case it doesn't pick up the configuration inmediatly please run the `ESLint: Restart ESLint Server` command from the palette (`Ctrl + Shift + p`).

If needed ESLint can be run manually from the terminal

```bash
npx eslint . --ext .ts,.tsx
```

### Formatting & [Prettier](https://prettier.io/)

Prettier is a useful tool for maintaining consistent code formatting in the project. The formatting can be done from the IDE and the code is automatically formatted according to the rules set in the `.prettierrc` configuration file.

### Automation & [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

Running the linter and formatter can be automated before each commit by using [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks), these are scripts that run before local actions in the git repository. Please be sure to read the [Setting up the Development Environment]() section of the documentation to set up the hooks.

## ✅ Conventions

### File Naming

All files and folders in the project must be named in `kebab-case`. This rule is enforced using ESLint with the `unicorn/filename-case` rule.



