import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, useQuery } from 'react-query'
import 'foundation-sites/dist/css/foundation.min.css';

import { Lanes } from './lanes';
import { backendClient } from './backendClient';

function App() {
    // Handle data binding.
    const laneQuery = useQuery('lanes', backendClient.getLanes);
    const paintQuery = useQuery('paint', backendClient.getPaint);

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
            <div className="grid-x grid-padding-x small-up-1 medium-up-3, large-up-3">
                <Lanes laneData={laneData} paintData={paintData} />
            </div>
        </div>
    )

}

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={backendClient.queryClient}>
        <App />
    </QueryClientProvider>
)
