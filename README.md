# ts-extension-builder

userscript と chrome 拡張をビルドするパッケージ

# install

```sh
npm install yakisova41/ts-extension-builder
```

# build

```sh
npx ts-extension-builder build type=extension minify env=production
```

## type

- userscript
- extension

## minify

- true
- false

## env

- development
- production

# dev

```sh
npx ts-extension-builder dev minify
```

## type

- userscript

## minify

- true
- false

# config

ts-extension-config.js

```js
module.exports = {
  userScriptHeader: {
    "@name": "userscript name",
    "@version": "0.1",
    "@license": "MIT",
    "@author": "author",
    "@description": "description",
    "@match": "https://example.com",
    "@namespace": "https://example.com",
  },
  //dev server configuration for userscript development
  devServer: {
    port: 5173,
    host: "localhost",
    websocket: 5174,
  },
  //chrome extension manifest v3
  manifest: {
    name: "__MSG_Name__",
    short_name: "name",
    version: 0.1,
    manifest_version: 3,
    description: "__MSG_Description__",
    content_scripts: [
      {
        matches: ["http://example.com"],
        js: ["contentScript.js"],
      },
    ],
    default_locale: "en",
    icons: {
      16: "assets/icon16.png",
      48: "assets/icon48.png",
      128: "assets/icon128.png",
    },
  },
  //chrome extension locales
  locales: {
    ja: {
      Name: {
        message: "名前",
      },
      Description: {
        message: "説明",
      },
    },
    en: {
      Name: {
        message: "name",
      },
      Description: {
        message: "descruotion",
      },
    },
  },
  //chrome extension assets
  assetsDir: path.join(__dirname, "assets"),
  //esbuild options
  esBuild: {
    outfile: path.join(__dirname, "dist/index.js"),
  },
};
```
