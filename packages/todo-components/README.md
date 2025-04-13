# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Module Federation with Native Federation vs Module federation

### Links:

Native federation documentation: https://www.npmjs.com/package/@softarc/native-federation

Example 1: https://dev.to/florianrappl/micro-frontends-with-native-federation-56j4

Example 2: https://github.com/manfredsteyer/native-federation-react-example

Interesting article to get some initiation: https://blog.stackademic.com/native-federation-vs-module-federation-a-detailed-comparison-451381fec06c

Use federation in a monorepo architecture with NX: https://medium.com/@wangel13/dynamic-micro-frontends-with-nx-and-react-d04a350732a4

Architecture and import maps: https://javascript.plainenglish.io/its-time-to-talk-about-import-map-micro-frontend-and-nx-monorepo-0b8e2c07568a

Article about module federation runtime: https://paul-ayanava.medium.com/runtime-module-federation-a-solution-to-improve-micro-frontend-performance-ed4ca7c7b565#:~:text=Module%20federation%20provides%20a%20way,module%20from%20the%20remote%20application.

Dynamic Remote Containers in webpack: https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers

### @module-federation for vite

So far, the plugin version for Vite doesn't handle types export for Typescript. I mean type definitions from a remote(provider) that a host(consumer) can use.

So, you have to use the `NativeFederationTypeScriptHost` plugin on the host to download type from remote when remote server is running.

Below the host configuration:

```tsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
import { NativeFederationTestsHost } from '@module-federation/native-federation-tests/vite'
import { NativeFederationTypeScriptHost } from '@module-federation/native-federation-typescript/vite'

const moduleFederationConfig = {
  name: 'host-app',
  exposes: {},
  filename: 'remoteEntry.js',
  remotes: {
    todo_components: 'todo_components@http://localhost:3000/mf-manifest.json',
  },
  shared: ['react'],
}

const moduleFederationConfig2 = {
  name: 'host-app',
  exposes: {},
  filename: 'remoteEntry.js',
  remotes: {
    todo_components: {
      type: 'module',
      name: 'todo_components',
      entry: 'http://localhost:3000/remoteEntry.js',
      entryGlobalName: 'todo_components',
      sharedScope: 'default',
    },
  },
  shared: ['react'],
}

export default defineConfig({
  plugins: [
    NativeFederationTypeScriptHost({ moduleFederationConfig }),
    NativeFederationTestsHost({ moduleFederationConfig }),
    federation(moduleFederationConfig2),
    react(),
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 3001,
    strictPort: true,
  },
})
```

And in the remote you need to use concurrently with the `@module-federation/vite` plugin this plugin to export types 
and federation. You'll need to expose them thanks to the proxy configuration. See configuration below:


```tsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import topLevelAwait from 'vite-plugin-top-level-await'
import { federation } from '@module-federation/vite'
import { NativeFederationTestsRemote } from '@module-federation/native-federation-tests/vite'
import { NativeFederationTypeScriptRemote } from '@module-federation/native-federation-typescript/vite'

import type { UserConfig } from 'vite'
import type { IRemoteConfig } from './typescriptConfig'

const remoteConfig: IRemoteConfig = {
  name: 'todo_components',
  filename: 'remoteEntry.js',
  exposes: {
    './Input': './src/components/Input',
    './List': './src/components/List',
  },
  shared: ['react'],
}

const config: UserConfig = {
  plugins: [
    NativeFederationTypeScriptRemote({
      tsConfigPath: './tsconfig.app.json',
      moduleFederationConfig: remoteConfig,
      deleteTypesFolder: true,
      typesFolder: '@mf-types',
      compilerInstance: 'tsc',
    }),
    NativeFederationTestsRemote({
      moduleFederationConfig: remoteConfig,
      deleteTestsFolder: true,
      testsFolder: '@mf-tests',
    }),
    federation({
      ...remoteConfig,
      // don't even need the manifest anymore
      manifest: true,
      // Will use that one it's out (not available yet)
      dts: {
        generateTypes: {
          tsConfigPath: './tsconfig.app.json',
          extractRemoteTypes: true,
          extractThirdParty: false,
          generateAPITypes: true,
          abortOnError: true,
          typesFolder: '@mf-types',
          deleteTypesFolder: true,
          compilerInstance: 'tsc',
        },
      },
    }),
    react(),
    topLevelAwait(),
  ],
  build: {
    target: 'chrome89',
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/@mf-types.zip': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: () => `/@fs/${process.cwd()}/dist/@mf-types.zip`,
      },
      '/remoteEntry.js': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: () => `/@fs/${process.cwd()}/dist/remoteEntry.js`,
      }, // don't even need the manifest anymore
      '/mf-manifest.json': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: () => `/@fs/${process.cwd()}/dist/mf-manifest.json`,
      },
    },
    fs: {
      allow: ['./dist/mf-manifest.json', 'dist', 'src'],
    },
  },
}

export default defineConfig(config)
```

With that the host will get the types so when developing you'll enjoy benefits of type Intellisense.
The host will find remotes, but on runtime, it will throw an error because the `@module-federation/vite` plugin
doesn't deal with runtime. Do get dynamically loaded remotes on runtime, use `@module-federation/runtime` or `@module-federation/enhanced`.

In the entry point of the host (consumer), use `ìnit` from `@module-federation/runtime` to "re-declare" or register
remotes for runtime in your host entry point like below:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { init } from '@module-federation/runtime'

//
init({
  name: 'host-app',
  remotes: [
    {
      name: 'todo_cpmponents',
      alias: 'todo_cpmponents',
      entry: 'http://localhost:3000/remoteEntry.js',
    },
  ],
  shared: {
    react: [
      {
        version: '19.0.0',
        scope: 'default',
        // pass lib means the shared has loaded
        lib: () => ({ version: '19.0.0' }),
        shareConfig: {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
      },
    ],
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

```

So, now, you'll have a standalone remote visible in its own server, a host where you can import all or parts of
your remote depending the things you exposed from the remote. For the sake of performance, you could use `loadRemote`
to lazy load remote components, but like below, it will do the trick (for now):

```tsx
import { ChangeEvent, useState } from 'react'

import Input from 'todo_components/Input'
import List from 'todo_components/List'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<string[]>([])

  const onSubmit = () => {
    setTodos((prev) => [...prev, newTodo])
    setNewTodo('')
  }

  return (
    <>
      <Input
        value={newTodo}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTodo(e.target.value)
        }
        onSubmit={onSubmit}
      />
      <List items={todos} />
    </>
  )
}

export default App

```

### Use of loadRemote (lazy loading of remote exposed components)

Here's a working example of the same code above with remote lazy loading:

```tsx
import { ChangeEvent, useState, lazy } from 'react'

const Input = lazy(() => import('todo_components/Input'))
const List = lazy(() => import('todo_components/List'))

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<string[]>([])

  const onSubmit = () => {
    setTodos((prev) => [...prev, newTodo])
    setNewTodo('')
  }

  return (
    <>
      <Input
        value={newTodo}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTodo(e.target.value)
        }
        onSubmit={onSubmit}
      />
      <List items={todos} />
    </>
  )
}

export default App

```

From the documentation:

Used to load initialized remote modules. When used with the build plugin, it can be directly loaded through 
the native import("remote name/expose") syntax, and the build plugin will automatically convert it 
to loadRemote("remote name/expose") usage.

So in the example above you don't need to use loadRemote directly.

### Sharing CSS across projects

Because CSS purging and generating a global CSS, tailwind won't work.
As an option, `twind` is not compatible with current versions of React & TypeScript.

To be able to get styles from remote and/or remote exposed components, one have to use
styles as modules to embed them with the exposed components. 

### Integrating the whole thing in a monorepo 
