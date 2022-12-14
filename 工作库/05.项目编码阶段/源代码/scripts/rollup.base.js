import typescript from 'rollup-plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import externalGlobals from 'rollup-plugin-external-globals'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

const presets = () => {
  const externals = {
    vue: 'Vue',
    'fusion.core': 'Fusion.Core',
    'fusion.path': 'Fusion.Path',
    'fusion.utils': 'Fusion.Utils',
    'fusion.validator': 'Fusion.Validator',
    'fusion.reactive': 'Fusion.Reactive',
    'fusion.form': 'Fusion.Form',
    'fusion.components': 'Fusion.Components',
    'fusion.renderer': 'Fusion.Renderer',
  }
  return [
    typescript({module: 'ESNext',}),
    resolve(),
    commonjs(),
    externalGlobals(externals, {
      exclude: ['**/*.{less,sass,scss}'],
    })
  ]
}

const createEnvPlugin = (env) => {
  return injectProcessEnv(
    {
      NODE_ENV: env,
    },
    {
      exclude: '**/*.{css,less,sass,scss}',
      verbose: false,
    }
  )
}

const noUIDtsPackages = [
  'fusion.core',
  'fusion.path',
  'fusion.utils',
  'fusion.validator',
  'fusion.reactive',
  'fusion.form',
  'fusion.componnets',
  'fusion.renderer'
]

export default (filename, targetName, ...plugins) => {
  const base = [
    {
      input: 'src/index.ts',
      output: {
        format: 'umd',
        file: `dist/${filename}.umd.development.js`,
        name: targetName,
        sourcemap: true,
        amd: {
          id: filename,
        },
      },
      plugins: [...presets(), ...plugins, createEnvPlugin('development')],
    },
    {
      input: 'src/index.ts',
      output: {
        format: 'umd',
        file: `dist/${filename}.umd.production.js`,
        name: targetName,
        sourcemap: true,
        amd: {
          id: filename,
        },
      },
      plugins: [
        ...presets(),
        terser(),
        ...plugins,
        createEnvPlugin('production')
      ],
    }
  ]

  if (noUIDtsPackages.includes(filename)) {
    base.push({
      input: 'esm/index.d.ts',
      output: {
        format: 'es',
        file: `dist/${filename}.d.ts`,
      },
      plugins: [dts(),...plugins],
    })
    base.push({
      input: 'esm/index.d.ts',
      output: {
        format: 'es',
        file: `dist/${filename}.all.d.ts`,
      },
      plugins: [
        dts({
          respectExternal: true,
        }),...plugins
      ],
    })
  }

  return base
}
