import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from "@rollup/plugin-terser";
import { dts } from "rollup-plugin-dts";

const plugins = [
  typescript({ tsconfig: './tsconfig.json' }),
  commonjs(), // Handle CommonJS dependencies
  terser(), // Minification
]

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'generaltranslation',
  'generaltranslation/internal'
];

export default [
  // Bundling for the main library (index.ts)
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.min.cjs',
        format: 'cjs',
        exports: 'auto', // 'auto' ensures compatibility with both default and named exports in CommonJS
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.min.mjs',
        format: 'es',
        exports: 'named', // Named exports for ES modules
        sourcemap: true,
      },
    ],
    plugins,
    external,
  },
  
  // TypeScript declarations for the main library
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },

  // Bundling for the internal module (internal.ts)
  {
    input: 'src/internal.ts',
    output: [
      {
        file: 'dist/internal.cjs.min.cjs',
        format: 'cjs',
        exports: 'auto',
        sourcemap: true,
      },
      {
        file: 'dist/internal.esm.min.mjs',
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins,
    external
  },

  // TypeScript declarations for the internal module
  {
    input: 'src/internal.ts',
    output: {
      file: 'dist/internal.d.ts',
      format: 'es',
    },
    plugins: [
      dts()
    ]
  },

  // Bundling for the client-only module (legacy and internal functions)
  {
    input: 'src/client.ts',
    output: [
      {
        file: 'dist/client.cjs.min.cjs',
        format: 'cjs',
        exports: 'auto',
        sourcemap: true,
      },
      {
        file: 'dist/client.esm.min.mjs',
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins,
    external
  },

  // TypeScript declarations for the client module
  {
    input: 'src/client.ts',
    output: {
      file: 'dist/client.d.ts',
      format: 'es',
    },
    plugins: [
      dts()
    ]
  },
];
