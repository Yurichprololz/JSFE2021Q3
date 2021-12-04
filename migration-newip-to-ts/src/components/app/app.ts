import AppController from '../controller/controller';
import { AppView } from '../view/appView';

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
interface IsourcesData{
    category: string
    country: string
    description: string
    id: string
    language: string
    name: string
    url: string
}
interface Irequest2{
    sources: IsourcesData[] 
    status: string
}

class App {
    controller: AppController
    view: AppView
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start():void {
        document
            ?.querySelector('.sources')
            ?.addEventListener('click', (e) => this.controller.getNews(e, (data:Irequest | Irequest2):void =>{
                if('totalResults' in data) this.view.drawNews(data)
            }
            ));
        this.controller.getSources((data:Irequest |Irequest2):void =>
        {
        if('sources' in data)
            this.view.drawSources(data)
        } );
    }
}

export default App;
