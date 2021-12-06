import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '0962f003e4114ee19bbd1f20d04ccddf',
        });
    }
}

export default AppLoader;
