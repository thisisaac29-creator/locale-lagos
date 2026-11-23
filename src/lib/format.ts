export function formatNaira(value: number): string {
  return `₦${new Intl.NumberFormat('en-NG').format(value)}`
}

export function whatsappLink(message: string, number = '2349030009758'): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/** Tiny warm blur placeholder used by next/image while real images load. */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRDdDNEI4Ii8+PC9zdmc+'
