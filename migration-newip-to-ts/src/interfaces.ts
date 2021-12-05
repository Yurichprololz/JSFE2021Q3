interface Inews{
    articles: InewsData[] 
    status: string
    totalResults: number
}
interface InewsData{
    author: string | null
    content: string
    description: string
    publishedAt: string
    source: InewsDataSources
    title: string
    url: string
    urlToImage: string
}
    
interface InewsDataSources{
    id: string
    name: string
}
interface IsourcesData{
    category: string
    country: string
    description: string
    id: string
    language: string
    name: string
    url: string
}
interface Isources{
    sources: IsourcesData[] 
    status: string
}
type Irequest = Inews |Isources

export {Inews,InewsData,InewsDataSources,IsourcesData,Isources,Irequest}