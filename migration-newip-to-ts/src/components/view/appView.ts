import News from './news/news';
import Sources from './sources/sources';
// interface Idata{
//     author: string 
//     content: string
//     description: string
//     publishedAt: string
//     sources:  IsourcesData
//     title: string
//     url: string
//     urlToImage: string
// }
interface Idata{
    author: string | null
    content: string
    description: string
    publishedAt: string
    sources: Isources
    title: string
    url: string
    urlToImage: string
}
    
interface Isources{
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

interface Irequest{
    articles: Idata[] 
    status: string
    totalResults: number
}
interface Irequest2{
    sources: IsourcesData[] 
    status: string
}
export class AppView {
    news:News
    sources: Sources
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data:Irequest):void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data:Irequest2):void { //IsourcesData
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
