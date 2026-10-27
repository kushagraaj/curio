// square map centred on lat/lon, built from esri's free tiles (no api key).
// attribution is required: render MAP_CREDIT somewhere on the map.

export type TileStyle = 'street' | 'light' | 'dark' | 'light_nolabels' | 'dark_nolabels' | 'satellite'

const TILE = 256

const LAYERS: Record<TileStyle, string[]> = {
  street: ['World_Street_Map'],
  light: ['Canvas/World_Light_Gray_Base', 'Canvas/World_Light_Gray_Reference'],
  dark: ['Canvas/World_Dark_Gray_Base', 'Canvas/World_Dark_Gray_Reference'],
  light_nolabels: ['Canvas/World_Light_Gray_Base'],
  dark_nolabels: ['Canvas/World_Dark_Gray_Base'],
  satellite: ['World_Imagery'],
}

export const MAP_CREDIT = '© Esri, HERE, Garmin, OSM'
export const SATELLITE_CREDIT = '© Esri, Maxar, Earthstar'

// web mercator pixel position at a zoom level
export function project(lat: number, lon: number, zoom: number) {
  const n = 2 ** zoom
  const r = (lat * Math.PI) / 180
  return {
    x: ((lon + 180) / 360) * n * TILE,
    y: ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n * TILE,
  }
}

export function MapTiles({
  lat,
  lon,
  zoom,
  size,
  style,
  className = '',
}: {
  lat: number
  lon: number
  zoom: number
  size: number
  style: TileStyle
  className?: string
}) {
  const n = 2 ** zoom
  const { x, y } = project(lat, lon, zoom)
  const left = x - size / 2
  const top = y - size / 2
  const x0 = Math.floor(left / TILE)
  const y0 = Math.floor(top / TILE)
  const x1 = Math.floor((left + size) / TILE)
  const y1 = Math.floor((top + size) / TILE)

  const tiles = []
  for (const layer of LAYERS[style]) {
    for (let tx = x0; tx <= x1; tx++) {
      for (let ty = y0; ty <= y1; ty++) {
        const wrapped = ((tx % n) + n) % n
        tiles.push(
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${layer}-${tx}-${ty}`}
            src={`https://server.arcgisonline.com/ArcGIS/rest/services/${layer}/MapServer/tile/${zoom}/${ty}/${wrapped}`}
            alt=""
            width={TILE}
            height={TILE}
            draggable={false}
            className="absolute max-w-none select-none"
            style={{ left: Math.round(tx * TILE - left), top: Math.round(ty * TILE - top), width: TILE, height: TILE }}
          />,
        )
      }
    }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {tiles}
    </div>
  )
}

/** light tiles normally, dark tiles inside .dark / [data-theme="dark"] */
export function ThemedTiles(props: { lat: number; lon: number; zoom: number; size: number; light: TileStyle; dark: TileStyle }) {
  const { light, dark, ...rest } = props
  return (
    <>
      <MapTiles {...rest} style={light} className="curio-tiles-light" />
      <MapTiles {...rest} style={dark} className="curio-tiles-dark" />
    </>
  )
}
