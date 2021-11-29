import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '0962f003e4114ee19bbd1f20d04ccddf',
        });
    }
}

export default AppLoader;
