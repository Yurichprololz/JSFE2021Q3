import News from './news/news';
import Sources from './sources/sources';
import {Inews, Isources} from '../../interfaces'

interface IAppView{
  news:News
  sources: Sources
  drawNews(data:Inews):void
  drawSources(data:Isources):void
}
export class AppView implements IAppView{
  news:News
  sources: Sources
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data:Inews):void {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data:Isources):void { 
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
