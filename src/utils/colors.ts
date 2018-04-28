import { scale } from 'chroma-js'

const COLORS = [
    '#ff206e',
    '#24cdd6'
]

export const sentimentHex = (value: number) => {
    const gradient = scale(COLORS).mode('rgb').domain([-1, 1])
    return gradient(value).hex()
}