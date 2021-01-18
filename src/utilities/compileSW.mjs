import fs from "fs";
import dotenv from "dotenv";
import replace from "replace-in-file";
import {normURLS} from "./globals.mjs";
import packageJson from "../../package.json";
import waitOn from "wait-on"
import config from "../../config/ella.config.js"

const {TITLE, API_ROOT_URL} = config;
const opts = {resources: ["service-worker.js"]};

dotenv.config();

function throwError(property) {
    throw new Error(property + " must be defined!");
}

async function compile() {
    const file = './service-worker.js';
    await fs.copyFile('./src/utilities/sw.empty.js', file, (err => {
        if (err) {
            throw err;
        }
    }));

    await waitOn(opts);
    if (!TITLE) throwError("VUE_APP_TITLE");
    await replace({files: file, from: /%TITLE%/g, to: TITLE.toLowerCase().replace(/ /g, "_")});

    await waitOn(opts);
    if (!API_ROOT_URL) throwError("VUE_APP_API_ROOT_URL");
    await replace({files: file, from: /%ROOT%/g, to: normURLS(API_ROOT_URL)})


    await waitOn(opts);
    await replace({files: file, from: /%VERSION%/g, to: packageJson.version})

}

compile();
