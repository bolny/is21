import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["./is21/index.tsx"],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["chrome109", "firefox102", "safari15", "edge114"],
    outfile: "./build/index.js",
    loader: { ".tsx": "tsx" },
});