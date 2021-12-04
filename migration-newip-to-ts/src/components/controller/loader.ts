interface Ioptions{
    apiKey?: string
    sources?: string
}
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
interface resp{
    endpoint:string
    options?: object
}
interface Irequest2{
    sources: IsourcesData[] 
    status: string
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
type Isomerequst={
    data: Irequest|Irequest2
}
class Loader {
    baseLink:string
    options:Ioptions
    constructor(baseLink:string, options:Ioptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }:resp, // string
        callback = (data: Irequest2) => { //function
            console.error('No callback for GET response');
        }
    ):void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res:Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options:Ioptions, endpoint:string):string {
        const urlOptions = { ...this.options, ...options };
        let url:string = `${this.baseLink}${endpoint}?`; ///string

        for (const [key, value] of Object.entries(urlOptions)) {
            url += `${key}=${value}&`;
          }
        
        // Object.keys(urlOptions).forEach((key) => {
        //         url += `${key}=${urlOptions[key]}&`;
        // });
        console.log(url.slice(0, -1));
        
        return url.slice(0, -1);
    }

    load(method:string, endpoint:string, callback: { (data:Irequest2): void}, options = {}) { // string, string, function, Ioptions
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
