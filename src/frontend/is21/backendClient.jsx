import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { apiRoot, requestOptions } from './config';

// The backend client handles all communication to the backend.

const backendClient = {
    getLanes: async () => {
        const response = await axios.get(apiRoot + "lane/", requestOptions);
        return response;
    },

    getPaint: async () => {
        const response = await axios.get(apiRoot + "paint/", requestOptions);
        return response;
    },

    putPaint: (id, paintData) => {
        axios.put(apiRoot + "paint/" + id + "/", paintData, requestOptions)
            .then(() => {
                backendClient.queryClient.invalidateQueries();
            })
            .catch((error) => {
                console.log(error)
                alert("There was an error connecting to the server. Try again.")
            });
    },

    queryClient: new QueryClient()
}

export { backendClient }
