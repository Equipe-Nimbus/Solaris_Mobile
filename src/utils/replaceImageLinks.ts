export function replaceLocalhost(url: string): string {
    return url.replace('http://localhost', 'http://10.0.2.2');
}