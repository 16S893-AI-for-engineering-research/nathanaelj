/**
 * Get the correct base path for links
 * In dev mode: '/'
 * In prod mode: '/nathanaelj'
 */
export function getBasePath(): string {
  if (typeof window !== 'undefined') {
    // Client-side: check current origin
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocal ? '/' : '/nathanaelj';
  }
  // Server-side: use import.meta.env
  return import.meta.env.DEV ? '/' : '/nathanaelj';
}

/**
 * Resolve a relative path to include the base path when needed
 * Usage: href={resolvePath('/about')}
 */
export function resolvePath(path: string): string {
  const basePath = getBasePath();
  if (basePath === '/') return path;
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : '/' + path;
  return basePath + normalizedPath;
}
