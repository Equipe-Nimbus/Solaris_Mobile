export function fDateToServer(date: string): string {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
}

export function fDate(date: string): string {
    const parsedDate = new Date(date);
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
    const year = parsedDate.getUTCFullYear();
    const hours = String(parsedDate.getUTCHours()).padStart(2, '0');
    const minutes = String(parsedDate.getUTCMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}