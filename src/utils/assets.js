// Resuelve un nombre de archivo de src/assets/ a su URL final de Vite.
// Devuelve null si el archivo no existe todavía (→ la UI muestra placeholder).
const assets = import.meta.glob('../assets/*.{webp,png,jpg,jpeg,gif,svg}', {
  eager: true,
  import: 'default',
})

export function getAsset(filename) {
  if (!filename) return null
  return assets[`../assets/${filename}`] || null
}
