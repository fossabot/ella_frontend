import fs from "fs";
import {readFile} from "fs/promises";
import dotenv from "dotenv";
import replace from "replace-in-file";
import {normURLS} from "./globals.mjs";
import waitOn from "wait-on"
import config from "../../config/ella.config.js"

/**
 * @module compileSW
 * @category Utilities
 * @description Builds the service worker from the file ``sw.empty.js`` by replacing the placeholders
 */

const {TITLE, API_ROOT_URL} = config;
const opts = {resources: ["service-worker.js"]};

dotenv.config();

function throwError(property) {
    throw new Error(property + " must be defined!");
}

/**
 * Compiles the Service Worker
 * @returns {Promise<void>}
 */
async function compile() {
    const file = './service-worker.js';
    await fs.copyFile('./src/utilities/sw.empty.js', file, (err => {
        if (err) {
            throw err;
        }
    }));

    await waitOn(opts);
    if (!TITLE) throwError("TITLE");
    await replace({files: file, from: /%TITLE%/g, to: TITLE.toLowerCase().replace(/ /g, "_")});

    await waitOn(opts);
    if (!API_ROOT_URL) throwError("ROOT_URL");
    await replace({files: file, from: /%ROOT%/g, to: normURLS(API_ROOT_URL)})

    const packageJson = JSON.parse(await readFile(new URL("../../package.json", import.meta.url)))

    await waitOn(opts);
    await replace({files: file, from: /%VERSION%/g, to: packageJson.version})

}

compile();
