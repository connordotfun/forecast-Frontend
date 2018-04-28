import Message from '../models/Message';

const sentimentSort = (a: [string, Message], b: [string, Message]) => (
    Math.abs(b[1].sentiment) - Math.abs(a[1].sentiment)
)

export const sortMapBySentiment = (map: Map<string, Message>) => (
    new Map(Array.from(map.entries()).sort(sentimentSort))
)