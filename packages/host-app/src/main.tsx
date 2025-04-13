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
