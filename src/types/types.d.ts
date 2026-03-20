interface Level {
    id: number,
    level_id: number,
    name: string,
    position: number,
    publisher: User,
    requirement: number,
    thumbnail: string,
    verifier: User,
    video: string
}

interface User {
    id: number,
    name: string,
    banned: boolean
}

interface ListCache {
    date: number,
    list: Level[]
}