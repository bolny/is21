import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'
import 'foundation-sites/dist/css/foundation.min.css';

const apiRoot = "http://127.0.0.1:8000/";
const requestOptions = { 
    auth: { username: 'admin', password: 'a5a97762' }
}

const getLanes = async () => {
    const response = await axios.get(apiRoot + "lane/", requestOptions);
    return response;
}

const getPaint = async () => {
    const response = await axios.get(apiRoot +"paint/", requestOptions);
    return response;
}

function Paint({paint}) {
    return (
        <div>
            <p><span>{paint.name}</span>-<span>{paint.amount} Liters</span></p>
        </div>
    )
}

function Lane({lane, paints}) {
    return (
        <div className="cell">
            <h4>{lane.name}</h4>
            <div>
                {paints}
            </div>
        </div>
    )
}

function Lanes({laneData, paintData}) {
    const lanes = laneData.map((lane) => {
        // Determine the paints to be placed in this lane.
        const paintsForLaneData = paintData.filter((paint) => {
            return paint.lane == lane.id;
        });

        const paints = paintsForLaneData.map((paint) => {
            return (
                <Paint key={paint.id} paint={paint} />
            );
        });
        return (
            <Lane key={lane.id} lane={lane} paints={paints} />
        );
    });
    return (
        <>
            {lanes}
        </>
    )
}

function App() {
    // Fetch data from the API
    const laneQuery = useQuery('lanes', getLanes);
    const paintQuery = useQuery('paint', getPaint);

    if (laneQuery.isError) {
        return <div>Error, {laneQuery.error.message}</div>
    }
    if (paintQuery.isError) {
        return <div>Error, {paintQuery.error.message}</div>
    }

    if (laneQuery.isLoading || paintQuery.isLoading) {
        return <div>Loading...</div>
    }

    const paintData = paintQuery.data.data;
    const laneData = laneQuery.data.data;

    return (
        <div className='grid-container' >
            <div className="grid-x">
                <div className="cell">
                    <h2>Paint Inventory</h2>
                </div>
            </div>
            <div className="grid-x grid-padding-x small-up-1 medium-up-3, large-up-6">
                <Lanes laneData={laneData} paintData={paintData} />
            </div>
        </div>
    )

}

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
)
