export interface Article {
    id: string,
    imageUrl: string,
    title: string,
    summary: string,
    content: string,
    author: Author,
    keywords: string[]
}

export interface Author {
    id: string,
    name: string,
    bio: string
}