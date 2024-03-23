import React, { useState } from 'react';
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
    const response = await axios.get(apiRoot + "paint/", requestOptions);
    return response;
}

const putPaint = (id, paintData) => {
    axios.put(apiRoot + "paint/" + id + "/", paintData, requestOptions)
        .then(() => {
            queryClient.invalidateQueries();
        })
        .catch(() => {
            alert("There was an error connecting to the server. Try again.")
        });
}

function PaintEditForm({paint, laneData, showForm}) {
    const [newAmount, setNewAmount] = useState(false)
    const [newLane, setNewLane] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const paintData = {
            lane: newLane || paint.lane,
            name: paint.name,
            colour: paint.colour,
            text_colour: paint.text_colour,
            amount: newAmount || paint.amount
        }

        putPaint(paint.id, paintData);

        // Toggles form visibility to off.
        showForm();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Amount:
                <input
                    type="text"
                    defaultValue={paint.amount}
                    onChange={(e) => setNewAmount(e.target.value)}
                />
            </label>
            <LaneSelectForm paint={paint} laneData={laneData} setNewLane={setNewLane} />
            <input type="submit" />
        </form>
    )
}

function LaneSelectForm({paint, laneData, setNewLane}) {
    const options = laneData.map((lane) => {
        return (
            <option key={lane.id} value={lane.id}>{lane.name}</option>
        )
    });
    return (
        <select
            name="Lane"
            defaultValue={paint.lane}
            onChange={(e) => setNewLane(e.target.value)}
        >
            {options}
        </select>
    )
}


function Paint({paint, laneData}) {
    const [shouldShowForm, setShouldShowForm] = useState(false);

    const showForm = () => {
      setShouldShowForm(!shouldShowForm);
    }

    return (
        <>
        <div className='grid-x'
            style={{background: paint.colour, color: paint.text_colour}}
        >
            <div className='cell small-3'>
                {paint.name}
            </div>
            <div className='cell small-3'>
                {paint.amount}
            </div>
            <div className='cell small-3'>
                <button className='button' onClick={showForm}>Edit</button>
            </div>
        </div>
        {shouldShowForm && (
            <PaintEditForm paint={paint} laneData={laneData} showForm={showForm}/>
        )}
        </>
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
                <Paint key={paint.id} paint={paint} laneData={laneData} />
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
            <div className="grid-x grid-padding-x small-up-1 medium-up-3, large-up-3">
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
