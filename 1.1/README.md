## 專案日誌

### 管理概覽

1. 套件管理：`pnpm`。
2. 狀態管理：`pinia`。
3. 程式碼管理：`Eslint`。
4. CSS 樣式：`Tailwind CSS`。

### Pinia

1. Install pinia

```powershell
pnpm install pinia @pinia/nuxt
```

```ts title='nuxt.config.ts'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],
  ],
});
```

### Eslint

1. Install Eslint

```powershell
pnpm add -D eslint @nuxt/eslint-config
```

2. Create a **.eslintrc.cjs** file in the root:

```js title='.eslintrc.cjs'
module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config"],
};
```

3. Modify **package.json**:

```json
"scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
}
```

4. Configuring VS Code - press **ctrl+shift+p** search **Open Workspace Settings (JSON)**:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### Tailwind CSS

1. Install Tailwind CSS

```powershell
pnpx nuxi module add @nuxtjs/tailwindcss
pnpx tailwindcss init
```

### Stylelint 
1. Install stylelint:
```powershell
pnpm install --save-dev stylelint stylelint-config-standard
```
2. Install scss and vue standard:
```powershell
pnpm install --save-dev stylelint-config-standard-scss stylelint-config-standard-vue stylelint-order postcss postcss-scss postcss-html
```
3. Install `@nuxtjs/stylelint-module`:
```powershell
pnpm add -D @nuxtjs/stylelint-module
```
4. In **nuxt.config.ts**:
```ts title='nuxt.config.ts'
export default {
  modules: [
    '@nuxtjs/stylelint-module',
  ]
}
```
5. Create a **.stylelintrc.cjs** file in the root and configure it:
```js

```
6. Modify **.vscode/settings.json**:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "stylelint.validate": [ "css", "scss", "vue" ]
}
```

### Prettier plugin for Tailwind CSS
1. Install Prettier and plugin
```powershell
pnpm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier eslint-plugin-prettier eslint-plugin-prettier-plugin-tailwindcss
```
2. Create a **.prettierrc** file:
```powershell
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```
3. Modify the **.prettierrc** file:
```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## 參考資源
1. [Nuxt.js 3.x Stylelint SCSS 程式碼檢查與自動排版](https://clairechang.tw/2023/08/04/nuxt3/nuxt-v3-stylelint/)
2. [Day 29 鐵人賽太空粒子的例子](https://emtech.cc/post/2023ironman-29/)