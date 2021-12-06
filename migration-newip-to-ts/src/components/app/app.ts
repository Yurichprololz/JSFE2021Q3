import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import{Inews, Isources, Irequest} from '../../interfaces'

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
      ?.addEventListener('click', (e) => this.controller.getNews(e, (data:Irequest):void =>{
        if('totalResults' in data) this.view.drawNews(data)
      }
      ));
    this.controller.getSources((data:Irequest):void =>{
      if('sources' in data)this.view.drawSources(data)
    } );
  }
}

export default App;
