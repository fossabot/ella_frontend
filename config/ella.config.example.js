/**
 * Einstellungen der Ella App
 * @module config
 */


/**
 * Enum der Auswahlmöglichkeiten für {@link NAVBAR_STYLE}
 * @enum {string}
 * @readonly
 */
const NAVBAR_VARIANTS = {

    /** Es wird nur das Logo angezeigt */
    LOGO: "logo",

    /** Es wird nur der Name der Ella-App angezeigt */
    NAME: "name",

    /** Es werden Logo und Name angezeigt */
    LOGO_AND_NAME: "logoAndName"
}


/**
 * Konfiguration
 */

/**
 * Die URL unter der die Wurzel der Ella API liegt
 * @type string
 */
const API_ROOT_URL = "https://ella.uv-kooperation.de";

/**
 * Die ID der Ella App
 * @type string
 */
const INSTANCE_ID = "ella_example_simple";

/**
 * Der Titel der Anwendung.
 * Wird für die PWA und für die Tabübersicht des Browsers genutzt
 * @type string
 */
const TITLE = "Ella";

/**
 * Hauptfarbe der Anwendung, ersetzt unter anderem die Bootstraps $primary Variable
 * @type string
 */
const THEME_COLOR = "#002d75"

/**
 * Wählt die Variante der Navigationsleiste.
 * @type {NAVBAR_VARIANTS}
 */
const NAVBAR_STYLE = NAVBAR_VARIANTS.LOGO_AND_NAME

/**
 * Deaktiviert die Speichern und Laden Funktionalität für Formulare
 * @type {boolean}
 * @default false
 */
const DISABLE_FORM_SAVING = false

/**
 * Der Titel der Sidebar. Wenn ein leerer String gewählt wird, wird der Titel aus Name und Beschreibung der Ella-App generiert
 * @type {string}
 */
const SIDEBAR_TITLE = ""






module.exports = {
    API_ROOT_URL, INSTANCE_ID, TITLE, THEME_COLOR, NAVBAR_STYLE, NAVBAR_VARIANTS, DISABLE_FORM_SAVING, SIDEBAR_TITLE
};
