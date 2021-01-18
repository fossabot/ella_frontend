const replace = require("replace-in-file").replaceInFileSync;
const fs = require("fs");
const term = require("terminal-kit").createTerminal();
const waitOn = require("wait-on")

const file = "config/ella.config.js";

async function configure() {
    const opts = {resources: ["config/ella.config.js"]};

    term.dim("Datei wird kopiert...\n");
    fs.copyFileSync("config/ella.config.template.js", file);

    let input;

    await waitOn(opts);
    term("\nBitte geben Sie die Root URL der API ein.\n");
    input = await term.inputField(
        {autoCompleteMenu: false}
    ).promise;
    replace({files: file, from: /%API_ROOT_URL%/g, to: input});

    await waitOn(opts);
    term("\nBitte geben Sie die Instance ID der API ein.\n");
    input = await term.inputField(
        {autoCompleteMenu: false}
    ).promise;
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
    term.singleColumnMenu(items, function (error, response) {
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
        term.eraseLine();
        term.green("\nKonfiguration abgeschlossen\n");
        process.exit(0);
    });


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
