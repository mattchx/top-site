/**
 * Generates a URL-friendly slug from a dentist's name.
 * @param {string} name - The dentist's name (with or without 'Dr.' prefix)
 * @returns {string} A URL-friendly slug in the format 'dr-firstname-lastname' or 'dr-lastname' for single names
 */
export function generateDentistSlug(name) {
    const nameParts = name.replace(/Dr\.?\s*/i, '').trim().split(' ');
    if (nameParts.length === 1) {
        return `dr-${nameParts[0].toLowerCase()}`;
    }
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return `dr-${firstName[0].toLowerCase()}-${lastName.toLowerCase()}`;
}