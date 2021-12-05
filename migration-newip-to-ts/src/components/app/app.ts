import AppController from '../controller/controller';
import { AppView } from '../view/appView';

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
    sources: InewsDataSources
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
// type I = Isources |Isources
interface IApp{
    start():void 
}
class App implements IApp{
  controller: AppController
  view: AppView

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start():void {
    document
      ?.querySelector('.sources')
      ?.addEventListener('click', (e) => this.controller.getNews(e, (data:Inews | Isources):void =>{
        if('totalResults' in data) this.view.drawNews(data)
      }
      ));
    this.controller.getSources((data:Inews |Isources):void =>{
      if('sources' in data)this.view.drawSources(data)
    } );
  }
}

export default App;
