import AppLoader from './appLoader';
interface Irequest2{
    sources: IsourcesData[] 
    status: string
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

interface IAppController{
  getSources(callback: ((data: Irequest2) => void) ):void 
  getNews(e:Event, callback: ((data:Irequest2) => void)):void 
}
class AppController  extends AppLoader implements IAppController{
  getSources(callback: ((data: Irequest2) => void) ) { //function :void
    super.getResp({endpoint: 'sources',},callback);
  }

  getNews(e:Event, callback: ((data:Irequest2) => void)) {
    let target  = e.target; // HTMLDivElement
    const newsContainer = e.currentTarget as HTMLDivElement
    while (target !== newsContainer) {
      if ((target as HTMLDivElement).classList.contains('source__item')) {
        const sourceId = (target as HTMLDivElement).getAttribute('data-source-id'); //string
          if ((target as HTMLDivElement).getAttribute('data-source') !== sourceId && typeof sourceId != 'object') {
            (target as HTMLDivElement).setAttribute('data-source', sourceId);
            super.getResp(
              {
                endpoint: 'everything',
                options: {
                  sources: sourceId,
                },
              },
                callback
                // callback: ((data: Irequest) => void) | undefined
            );
          }
        return;
      }
      target = (target as HTMLDivElement).parentNode; // HTMLDivElement
    }
  }
}
  
export default AppController;
