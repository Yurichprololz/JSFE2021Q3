import './sources.css';
import {IsourcesData} from '../../../interfaces'

interface ISources{
    draw(data:IsourcesData[]) :void
}
class Sources implements ISources {
  draw(data:IsourcesData[]) { 
      
    const fragment = document.createDocumentFragment();
    const sourceItemTemp:HTMLTemplateElement = document.querySelector('#sourceItemTemp');

    data.forEach((item:IsourcesData) => {
      const sourceClone = sourceItemTemp?.content?.cloneNode(true);

      (sourceClone as  HTMLElement).querySelector('.source__item-name').textContent = item.name;
      (sourceClone as  HTMLElement).querySelector('.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document?.querySelector('.sources')?.append(fragment);
  }
}

export default Sources;
