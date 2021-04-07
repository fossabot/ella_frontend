const replace = require("replace-in-file").replaceInFileSync;
const fs = require("fs");
const term = require("terminal-kit").createTerminal();
const waitOn = require("wait-on");
const axios = require("axios");
const {getAllThemes, downloadThemeRelease, installTheme} = require("./installTheme");

const file = "config/ella.config.js";

if (process.env.CI) {
    fs.copyFileSync("config/ella.config.example.js", file);
    process.exit(0);
}

function normURLS(url) {
    return url.replace(/\/$/, "");
}

function selectReleaseAndInstall() {
    return new Promise(((resolve, reject) => {
        term("\nWählen Sie ein Theme für die Anwendung\n");
        getAllThemes().then(res => {
            const themes = res.map(t => t.name);
            themes.unshift("default");
            term.singleColumnMenu(themes, async function (error, response) {
                // console.log(response);
                if(await downloadThemeRelease("ef_theme-" + response.selectedText).catch(reject)) await installTheme().catch(reject);
                resolve();
            })
        }).catch(reject);
    }));
}

async function configure() {
    const opts = {resources: ["config/ella.config.js"]};

    term.dim("Datei wird kopiert...\n");
    fs.copyFileSync("config/ella.config.template.js", file);

    let input;

    while (!input) {
        await waitOn(opts);
        term("\nBitte geben Sie die Root URL der API ein.\n");
        input = await term.inputField(
            {autoCompleteMenu: false}
        ).promise;
        try{
            var res = await axios.get(input);
            if (res.status !== 200) {
                input = null;
            }
        }catch (e) {
            input = null;
        }
        if (input === null) {
            term.red("\nSie haben eine ungültige URL angegeben\n");
        }
    }
    const url = input;
    replace({files: file, from: /%API_ROOT_URL%/g, to: input});

    await waitOn(opts);
    input = null;
    while (!input) {
        term("\nBitte geben Sie die Instance ID der API ein.\n");
        input = await term.inputField(
            {autoCompleteMenu: false}
        ).promise;
        try{
            res = await axios.get(normURLS(url) + "/" + input);
            if (res.status !== 200) {
                input = null;
            }
        }catch (e) {
            input = null;
        }
        if (input === null) {
            term.red("\nDie angegebene Instanz konnte nicht aufgerufen werden\n");
        }
    }

    replace({files: file, from: /%INSTANCE_ID%/g, to: input});

    await waitOn(opts);
    term("\nBitte geben Sie den Titel der Anwendung ein. ");
    term.dim(" (Wird für die PWA und für die Tabübersicht des Browsers genutzt)\n");
    input = await term.inputField(
        {autoCompleteMenu: false}
    ).promise;
    replace({files: file, from: /%TITLE%/g, to: input});

    await waitOn(opts);
    term("\nBitte geben Sie die Theme Color in hexadezimaler Form ein.");
    term.dim(" (Hauptfarbe der Anwendung, ersetzt unter anderem die Bootstraps $primary Variable. Bsp: #002d75)\n");
    input = await term.inputField(
        {autoCompleteMenu: false}
    ).promise;
    replace({files: file, from: /%THEME_COLOR%/g, to: input});

    const items = [
        "Nur das Logo",
        "Nur der Name der Anwendung, abgerufen vom Backend",
        "Logo und Name"
    ]

    await waitOn(opts);
    term("\nWählen Sie die Variante der Navigationsleiste\n");
    term.singleColumnMenu(items, async function (error, response) {
        switch (response.selectedIndex) {
            case 0:
                replace({files: file, from: /"%NAVBAR_STYLE%"/g, to: "NAVBAR_VARIANTS.LOGO"});
                break;
            case 1:
                replace({files: file, from: /"%NAVBAR_STYLE%"/g, to: "NAVBAR_VARIANTS.NAME"});
                break;
            case 2:
                replace({files: file, from: /"%NAVBAR_STYLE%"/g, to: "NAVBAR_VARIANTS.LOGO_AND_NAME"});
                break;
        }

        await waitOn(opts);
        term("\nSoll die Speichern/Laden Funktion deaktiviert werden? [j|N]\n");
        term.yesOrNo({yes: ['j', 'J'], no: ['n', 'N', 'ENTER']}, async function (error, result) {

            if (result) {
                replace({files: file, from: /DISABLE_FORM_SAVING_VALUE/g, to: true});
            } else {
                replace({files: file, from: /DISABLE_FORM_SAVING_VALUE/g, to: false});
            }


            await selectReleaseAndInstall();

        });
    });


}

if (process.argv[2] === "--override") {
    fs.unlinkSync(file);
    configure();
}

if (!fs.existsSync(file)) {
    term.inverse('Es wurde kein config file gefunden! Konfiguration starten? [J|n]\n');

    term.yesOrNo({yes: ['j', 'ENTER', 'J'], no: ['n', 'N']}, function (error, result) {

        if (result) {
            term("Die Konfiguration wird gestartet\n");
            configure();
        } else {
            term("Die Konfiguration wird übersprungen.\n");
            term.red("Denken Sie daran, die config Datei wie im README beschrieben zu erstellen, da Ella sonst nicht funktionieren wird!\n");
            process.exit(0);
        }
    });
}


module.exports = {selectReleaseAndInstall};
