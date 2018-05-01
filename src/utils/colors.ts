import { scale } from 'chroma-js'

const COLORS = [
    '#ff206e',
    '#11dee8'
]

export const sentimentHex = (value: number) => {
    const gradient = scale(COLORS).mode('rgb').domain([-1, 0.75])
    return gradient(value).hex()
}