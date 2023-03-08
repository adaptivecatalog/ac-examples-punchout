import axios, {AxiosError, AxiosResponse} from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        const { data, status, config } = error.response!;
        switch (status) {
            case 400:
                console.error(data);
                break;

            case 401:
                console.error('unauthorised');
                break;

            case 404:
                console.error('/not-found');
                break;

            case 500:
                console.error('/server-error');
                break;
        }
        return Promise.reject(error);
    }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),
};

const punchoutSetup = {
    create: () => request.post<IPunchoutSetupResponse>('/api/punchout/setup', {}),
};

const punchoutProducts = {
    details: (id: string) => request.get<IPunchoutOrder>(`/api/punchout/order/${id}`),
};

interface IPunchoutSetupResponse {
    url: string;
}

export interface IPunchoutOrder {
    items: IPunchoutProduct[];
    id: string;
    postUrl: string;
}

const api = {
    punchoutSetup,
    punchoutProducts,
};

export interface IPunchoutProduct {
    unitPrice : number;
    msrp : number;
    description : string;
    productName : string;
    segment : string;
    manufacturerName : string;
    vendorName : string;
    vendorPartNumber : string;
    quantity : number;
    manufacturerPartNumber : string;
    category : string;
    subCategory : string;
    imageUrl : string;
    id : string;
}

export default api;

