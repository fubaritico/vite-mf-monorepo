import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'
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

export default defineConfig(({ mode }) => ({
  plugins: [
    ...(mode !== 'production'
      ? [NativeFederationTypeScriptHost({ moduleFederationConfig })]
      : []),
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
}))
