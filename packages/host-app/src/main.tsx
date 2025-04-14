import { init } from '@module-federation/runtime'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'

//
init({
  name: 'host-app',
  remotes: [
    {
      name: 'todo_components',
      alias: 'todo_components',
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

const root = document.getElementById('root')

if (!root) {
  throw new Error('root not found')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
