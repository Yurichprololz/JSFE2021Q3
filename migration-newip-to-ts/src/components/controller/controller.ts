import AppLoader from './appLoader';
import {Isources} from '../../interfaces'

interface IAppController{
  getSources(callback: ((data: Isources) => void) ):void 
  getNews(e:Event, callback: ((data:Isources) => void)):void 
}
class AppController  extends AppLoader implements IAppController{
  getSources(callback: ((data: Isources) => void) ) { 
    super.getResp({endpoint: 'sources',},callback);
  }

  getNews(e:Event, callback: ((data:Isources) => void)) {
    let target  = e.target; 
    const newsContainer = e.currentTarget as HTMLDivElement
    while (target !== newsContainer) {
      if ((target as HTMLDivElement).classList.contains('source__item')) {
        const sourceId = (target as HTMLDivElement).getAttribute('data-source-id'); 
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
            );
          }
        return;
      }
      target = (target as HTMLDivElement).parentNode; 
    }
  }
}
  
export default AppController;
