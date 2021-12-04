import './sources.css';
interface IsourcesData{
    category: string
country: string
description: string
id: string
language: string
name: string
url: string
}
class Sources {
    draw(data:IsourcesData[]) { // :IsourcesData[]
        
        const fragment = document.createDocumentFragment();
        const sourceItemTemp:HTMLTemplateElement = document.querySelector('#sourceItemTemp');

        data.forEach((item:IsourcesData) => { // IsourcesData
            const sourceClone = sourceItemTemp?.content?.cloneNode(true);

            (sourceClone as  HTMLElement).querySelector('.source__item-name').textContent = item.name;
            (sourceClone as  HTMLElement).querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document?.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
