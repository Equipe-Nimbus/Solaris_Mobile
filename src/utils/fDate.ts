export function fDateToServer(date: string): string {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
}