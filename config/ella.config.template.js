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
const API_ROOT_URL = "%API_ROOT_URL%";

/**
 * Die ID der Ella App
 * @type string
 */
const INSTANCE_ID = "%INSTANCE_ID%";

/**
 * Der Titel der Anwendung.
 * Wird für die PWA und für die Tabübersicht des Browsers genutzt
 * @type string
 */
const TITLE = "%TITLE%";

/**
 * Hauptfarbe der Anwendung, ersetzt unter anderem die Bootstraps $primary Variable
 * @type string
 */
const THEME_COLOR = "%THEME_COLOR%"

/**
 * Wählt die Variante der Navigationsleiste.
 * @type {NAVBAR_VARIANTS}
 */
const NAVBAR_STYLE = "%NAVBAR_STYLE%"







module.exports = {
    API_ROOT_URL, INSTANCE_ID, TITLE, THEME_COLOR, NAVBAR_STYLE, NAVBAR_VARIANTS
};
