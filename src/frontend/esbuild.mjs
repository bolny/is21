import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["./is21/index.jsx"],
    bundle: true,
    minify: false,
    sourcemap: true,
    target: ["chrome109", "firefox102", "safari15", "edge114"],
    outfile: "./build/index.js",
    loader: { ".jsx": "jsx", ".js": "jsx" },
    format: "cjs"
});
