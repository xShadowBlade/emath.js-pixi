#!/usr/bin/env node
/* eslint-disable jsdoc/check-tag-names */
/**
 * @file CLI build script
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require("esbuild");
const { replace } = require("esbuild-plugin-replace");
const { umdWrapper } = require("./umdPlugin.js");
const fs = require("fs/promises");
const packageJson = require("../../package.json");

const replacePlugin = replace({
    // "process.env.NODE_ENV": JSON.stringify("production"),
    "PKG_VERSION": JSON.stringify(packageJson.version),
    "emath.js": "emath.js/ts",
    "emath.js/game": "emath.js/ts/game",
    "emath.js/presets": "emath.js/ts/presets",
});

/**
 * @typedef {import("esbuild").BuildOptions} BuildOptions
 */

const dev = {
    format: "umd",
    plugins: [umdWrapper(), replacePlugin],
    external: ["reflect-metadata", "class-transformer", "emath.js"],
};

const devEsm = {
    format: "esm",
    plugins: [replacePlugin],
    external: ["reflect-metadata", "class-transformer", "emath.js"],
};

const min = {
    format: "iife",
    minify: true,
    plugins: [replacePlugin],
};

// TODO: fix hook
/**
 * Build options
 * @type {BuildOptions[]}
 */
const buildOptions = [
    // PixiGame
    {
        // entryPoints: ["src/pixiGame/hookPixiGame.ts"],
        entryPoints: ["src/index.ts"],
        outfile: "dist/pixi/eMath.pixi.js",
        // external: ["pixi.js", ...externalIntFiles],
        // format: "umd",
        // plugins: [umdWrapper()],
        ...dev,
        external: [...dev.external, "pixi.js"],
    },
    {
        entryPoints: ["src/hookPixiGame.ts"],
        outfile: "dist/pixi/eMath.pixi.min.js",
        // external: ["pixi.js", "./src/index.ts", "./src/hookMain.ts", "./src/classes/*", "./src/E/*"],
        // format: "iife",
        // minify: true,
        ...min,
    },
    {
        entryPoints: ["src/index.ts"],
        outfile: "dist/pixi/eMath.pixi.mjs",
        ...devEsm,
        external: [...devEsm.external, "pixi.js"],
    },
];

Promise.all(buildOptions.map(async function (option) {
    // option.external = ["pixi.js"];
    option.bundle = true;
    // option.plugins = [umdWrapper()];

    // Build
    /**
     * Fix import paths
     */
    // async function replaceFileImports () {
    //     const fileData = await fs.readFile(option.outfile, "utf8");
    //     // console.log(fileData);
    //     const regex = /require\(['"]\.\.\/\.\.\/src\/[\w/]+\.ts['"]\)/g;
    //     // const regex = /.{44}/g; // test
    //     const replacement = "require(\"../main/emath.js\")";
    //     const matches = fileData.match(regex);
    //     if (!matches) {
    //         return;
    //     }
    //     // console.log(matches);
    //     const fileDataReplaced = fileData.replace(regex, replacement);
    //     // console.log(fileDataReplaced);
    //     await fs.writeFile(option.outfile, fileDataReplaced);
    // }
    // console.log(option.outfile);
    const timeInit = Date.now();
    if (option.minify) {
        // If it is a .min.js, append the umdWrapper, then build, then minify
        let newOption = option;
        newOption.minify = false;
        newOption = {
            ...newOption,
            ...dev,
            external: [],
        };
        esbuild
            .build(newOption)
            .then(() => {
                newOption.minify = true;
                newOption = {
                    ...newOption,
                    entryPoints: [newOption.outfile],
                    allowOverwrite: true,
                    minify: true,
                    plugins: [],
                    footer: undefined,
                    banner: undefined,
                };
                // console.log(newOption.outfile, newOption);
                return esbuild.build(newOption);
            })
            .then(() => {
                console.log(`${newOption.outfile} (min): ${Date.now() - timeInit}ms`);
            });
    } else {
        esbuild
            .build(option)
            .then(() => {
                // console.log(option.outfile, result);
                console.log(`${option.outfile}: ${Date.now() - timeInit}ms`);
                // if (["src/game/index.ts", "src/pixiGame/index.ts"].includes(option.entryPoints[0])) {
                //     replaceFileImports();
                // }
                // option.outfile

                // If it is a .min.js, run it again
            })
            // .then(() => console.log(`${option.outfile}: ${Date.now() - timeInit}ms`))
            .catch((e) => {
                console.error(`Error building ${option.outfile}: ${e}`);
                process.exit(1);
            });
    }
}));
