interface Region {
    ID: string,
    name: string,
    north: number,
    east: number,
    south: number,
    west: number,
    centerLat: number,
    centerLon: number,
    polygon?: google.maps.Polygon
}

export default Region