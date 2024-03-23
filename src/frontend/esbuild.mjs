import * as esbuild from "esbuild";
import CssModulesPlugin from 'esbuild-css-modules-plugin';

await esbuild.build({
    entryPoints: ["./is21/index.jsx"],
    bundle: true,
    minify: false,
    sourcemap: true,
    target: ["chrome109", "firefox102", "safari15", "edge114"],
    outfile: "./build/index.js",
    loader: { ".jsx": "jsx", ".js": "jsx" },
    format: "cjs",
    plugins: [
        CssModulesPlugin({
          force: true,
          emitDeclarationFile: true,
          localsConvention: 'camelCaseOnly',
          namedExports: true,
          inject: false
        })
      ]
});
