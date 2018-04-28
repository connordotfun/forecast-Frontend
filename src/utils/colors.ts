import { scale } from 'chroma-js'

const COLORS = [
    '#ff206e',
    '#2ca58d'
]

const sentimentHex = (value: number) => {
    const gradient = scale(COLORS).mode('rgb')
    return gradient((value + 1) / 2).hex()
}

export default sentimentHex