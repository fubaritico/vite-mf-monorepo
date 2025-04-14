import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import topLevelAwait from 'vite-plugin-top-level-await'
import { federation } from '@module-federation/vite'
import { NativeFederationTypeScriptRemote } from '@module-federation/native-federation-typescript/vite'

import type { ModuleFederationOptions } from '@module-federation/vite/lib/utils/normalizeModuleFederationOptions'
import type { UserConfig, CommonServerOptions } from 'vite'

const remoteConfig: ModuleFederationOptions = {
  name: 'todo_components',
  filename: 'remoteEntry.js',
  exposes: {
    './Input': './src/components/Input',
    './List': './src/components/List',
  },
  shared: ['react'],
}

const proxyOptions: CommonServerOptions = {
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
    },
    '/mf-manifest.json': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: () => `/@fs/${process.cwd()}/dist/mf-manifest.json`,
    },
  },
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
    federation({
      ...remoteConfig,
    }),
    react(),
    topLevelAwait(),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    emptyOutDir: true,
    // Ensure CSS is split per component
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  css: {
    devSourcemap: true,
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    ...proxyOptions,
    fs: {
      allow: ['./dist/mf-manifest.json', 'dist', 'src'],
    },
  },
}

export default defineConfig(config)
