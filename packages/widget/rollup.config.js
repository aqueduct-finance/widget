import postcss from "rollup-plugin-postcss";
import typescript from 'rollup-plugin-typescript2';
import babel from "@rollup/plugin-babel";
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import image from '@rollup/plugin-image';

export default [
  {
    input: "./src/components/Swap/index.tsx",
    output: {
      file: "./dist/index.es.js",
      format: "esm",
      sourcemap: true,
    },
    external: ["react", "react-dom", "styled-components"],
    plugins: [
        postcss({
          config: {
            path: "./postcss.config.js",
          },
          extensions: [".css"],
          /*inject(cssVariableName) {
            return `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`;
          }*/
          //extract: true
        }),
        typescript({ 
          useTsconfigDeclarationDir: true,
          tsconfig: './tsconfig.prod.json',
        }),
        babel({
            babelHelpers: "bundled",
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            exclude: "node_modules/**",
        }),
        resolve({
          resolveOnly: ['react-icons']
        }),
        image(),
    ],
  },

  // create a separate testing directory to be used locally
  // ran into issues using 'npm/yarn link' - this command ignores the 'files' param in package.json and
  // copies all files in this directory, which led to issues with module resolution
  {
    input: "./src/components/Swap/index.tsx",
    output: {
      file: "./testing_dist/dist/index.es.js",
      format: "esm",
      sourcemap: true,
    },
    external: ["react", "react-dom", "styled-components"],
    plugins: [
        postcss({
          config: {
            path: "./postcss.config.js",
          },
          extensions: [".css"],
          //extract: true
        }),
        typescript({ 
          useTsconfigDeclarationDir: true,
          tsconfig: './tsconfig.dev.json',
        }),
        babel({
            babelHelpers: "bundled",
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            exclude: "node_modules/**",
            configFile: './babel.customconfig.cjs'
        }),
        resolve({
          resolveOnly: ['react-icons']
        }),
        image(),
        copy({
          targets: [
            { src: 'package.json', dest: 'testing_dist' }
          ],
          overwrite: true
        }),
    ],
  }
]