// interface Ioptions{
    // apiKey?: string
    // sources?: string
// }

class Loader {
    // baseLink:string
    // options:IOptions
    constructor(baseLink, options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }, // string
        callback = () => { //function
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }
//     body: ReadableStream
// locked: true
// [[Prototype]]: ReadableStream
// bodyUsed: true
// headers: Headers
// [[Prototype]]: Headers
// ok: true
// redirected: false
// status: 200
// statusText: ""
// type: "cors"
// url: "https://newsapi.org/v2/sources?apiKey=0962f003e4114ee19bbd1f20d04ccddf"

    makeUrl(options, endpoint) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`; ///string

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    load(method, endpoint, callback, options = {}) { // string, string, function, Ioptions
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
