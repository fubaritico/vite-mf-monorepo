import { NativeFederationTestsRemote } from '@module-federation/native-federation-tests/vite'
import { NativeFederationTypeScriptRemote } from '@module-federation/native-federation-typescript/vite'

import type { ModuleFederationOptions } from '@module-federation/vite/lib/utils/normalizeModuleFederationOptions'

export type IRemoteConfig = Pick<
  ModuleFederationOptions,
  'name' | 'filename' | 'exposes' | 'shared'
>

export default function typescriptConfig(remoteConfig: IRemoteConfig) {
  return {
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
    ],
    server: {
      port: 4000,
      strictPort: true,
      proxy: {
        '/@mf-types.zip': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          rewrite: () => `/@fs/${process.cwd()}/dist/@mf-types.zip`,
        },
      },
      fs: {
        allow: ['./dist'],
      },
    },
  }
}
