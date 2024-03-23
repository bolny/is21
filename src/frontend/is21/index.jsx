import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'

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

function renderPaint(paint) {
    return (
        <li key={paint.id}>
            <p><span>{paint.name}</span>-<span>{paint.amount} Liters</span></p>
        </li>
    )
}

function renderLane(lane, paints) {
    return (
        <li key={lane.id} >
            <h2>{lane.name}</h2>
            <ul>
                {paints}
            </ul>
        </li>
    )
}

function renderApp(lanes) {
    return (
        <div>
            <h1>Paint Inventory</h1>
            <ul>
                {lanes}
            </ul>
        </div>
    );
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
    // Build the lanes
    const lanes = laneData.map((lane) => {
        // Determine the paints to be placed in this lane.
        const paintsForLaneData = paintData.filter((paint) => {
            return paint.lane == lane.id;
        });

        const paints = paintsForLaneData.map((paint) => {
            return renderPaint(paint);
        });
        return renderLane(lane, paints);
    });
    return renderApp(lanes);

}

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
)
