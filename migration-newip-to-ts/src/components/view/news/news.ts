import './news.css';
interface Idata{
    author: string | null
content: string
description: string
publishedAt: string
source?: {
    id: string,
    name: string
}
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
class News {
    draw(data:Idata[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment(); //HTMLElement 
        const newsItemTemp:HTMLTemplateElement = document.querySelector('#newsItemTemp'); //HTMLElement 
        news.forEach((item, idx) => { // number, Idata
            const newsClone:Node = newsItemTemp?.content.cloneNode(true);//HTMLElement 
            if (idx % 2) (newsClone as HTMLElement).querySelector('.news__item').classList.add('alt');

            (newsClone as HTMLElement).querySelector('.news__meta-photo').setAttribute('style',`background-image:url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`);
            (newsClone as HTMLElement).querySelector('.news__meta-author').textContent = item.author || item.source.name;
            (newsClone as HTMLElement).querySelector('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

                (newsClone as HTMLElement).querySelector('.news__description-title').textContent = item.title;
                (newsClone as HTMLElement).querySelector('.news__description-source').textContent = item.source.name;
            (newsClone as HTMLElement).querySelector('.news__description-content').textContent = item.description;
            (newsClone as HTMLElement).querySelector('.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        
            const newsBlock:HTMLElement|null = document.querySelector('.news')
            if(newsBlock != null){ 
                newsBlock.innerHTML  = '';
        }
        document?.querySelector('.news')?.appendChild(fragment);
    }
}

export default News;
