export function generateDentistSlug(name: string): string {
    const nameParts = name.replace(/Dr\.?\s*/i, '').trim().split(' ');
    if (nameParts.length === 1) {
        return `dr-${nameParts[0].toLowerCase()}`;
    }
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return `dr-${firstName[0].toLowerCase()}-${lastName.toLowerCase()}`;
}