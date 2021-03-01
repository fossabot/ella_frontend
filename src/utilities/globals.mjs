/**
 * Modul mit Anwendungsweit verwendeten Methoden
 * @global
 */

/**
 * Normalises an URL by removing a trailing slash
 * @param {string} url The URL
 * @returns {string} The normalised URL
 */
export function normURLS(url) {
    return url.replace(/\/$/, "");
}

/**
 * Returns current value of css variable for the body
 * @example
 * let bootstrapPrimary = getCSSVariable('primary');
 * @param {string} variable The variable
 * @returns {string} The value of the variable
 */
export function getCSSVariable(variable) {
    return getComputedStyle(document.body).getPropertyValue('--' + variable);
}

/**
 * Options for Efa-Files
 */
export const fileOptions = {
    types: [
        {
            description: '.efa Files',
            accept: {
                'application/efa': ['.efa'],
            },
        },
    ],
};

/**
 * Use to check if a color is light or dark
 * @param {string} color The color
 * @returns {boolean} Returns ``true`` if the color is light
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
