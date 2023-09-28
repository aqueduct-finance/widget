import postcss from "rollup-plugin-postcss";
import typescript from 'rollup-plugin-typescript2';
import babel from "@rollup/plugin-babel";
import resolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';

export default {
    input: "./src/components/Swap/index.tsx",
    output: {
      file: "./dist/index.es.js",
      format: "esm",
      sourcemap: false,
    },
    external: ["react", "react-dom", "styled-components"],
    plugins: [
        postcss({
          config: {
            path: "./postcss.config.js",
          },
          extensions: [".css"],
          inject(cssVariableName) {
            return `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`;
          }
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
}