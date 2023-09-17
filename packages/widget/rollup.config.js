import postcss from "rollup-plugin-postcss";
import typescript from 'rollup-plugin-typescript2';
import babel from "@rollup/plugin-babel";
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
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
          extract: true
        }),
        typescript({ 
          useTsconfigDeclarationDir: true,
          tsconfig: './tsconfig.json',
        }),
        babel({
            babelHelpers: "bundled",
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            exclude: "node_modules/**",
        }),
        resolve({
          resolveOnly: ['react-icons']
        }),

        // create a separate testing directory to be used locally
        // ran into issues using 'npm/yarn link' - this command ignores the 'files' param in package.json and
        // copies all files in this directory, which led to issues with module resolution
        copy({
          targets: [
            { src: 'dist/*', dest: 'testing_dist/dist' },
            { src: 'public/*', dest: 'testing_dist/public' },
            { src: 'package.json', dest: 'testing_dist' }
          ]
        })
    ],
}