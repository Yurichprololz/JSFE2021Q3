import News from './news/news';
import Sources from './sources/sources';
// interface Idata{
//     author: string | null
// content: string
// description: string
// publishedAt: string
// source: {
//     id: string,
//     name: string
// }
// title: string
// url: string
// urlToImage: string
// }
// interface IsourcesData{
//     category: string
// country: string
// description: string
// id: string
// language: string
// name: string
// url: string
// }
// interface Irequest{
//     articles: Idata[] 
//     status: string
//     totalResults: number
// }

export class AppView {
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data) { //IsourcesData
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
