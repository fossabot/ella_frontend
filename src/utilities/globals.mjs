/**
 * Modul mit Anwendungsweit verwendeten Methoden
 * @module src/utilities/global
 */

/**
 * Normalisiert eine URL, indem ein eventueller / am Ende entfernt wird
 * @param {string} url Die URL
 * @returns {string} Die normalisierte URL
 */
export function normURLS(url) {
    return url.replace(/\/$/, "");
}

/**
 * Gibt den aktuellen Wert einer CSS-Variable zurück. Ausgewertet auf dem body.
 * @example
 * let bootstrapPrimary = getCSSVariable('primary');
 * @param {string} variable Die Variable, ohne die zwei führenden Bindestriche
 * @returns {string} Der Wert der Variable
 */
export function getCSSVariable(variable) {
    return getComputedStyle(document.body).getPropertyValue('--' + variable);
}

/**
 * Bestimmt, ob eine Farbe hell oder dunkel ist
 * @param {string} color Die Farbe
 * @returns {boolean} Gibt ``true`` zurück, wenn die Farbe hell ist
 */
export function isLightColor(color) {

    let r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    } else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    return (hsp > 127.5)

}
