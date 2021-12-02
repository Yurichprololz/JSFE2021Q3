import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback) { //function :void
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e, callback) {
        let target = e.target; // HTMLDivElement
        const newsContainer = e.currentTarget;// HTMLDivElement
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id'); //string
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
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
            target = target.parentNode; // HTMLDivElement
        }
    }
}

export default AppController;
