import React, { useState } from "react";

import { backendClient } from "./backendClient";
import { LaneSelectForm } from "./lanes";

// All JSX components to do with paint.

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
                {paint.amount} Liters
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

        backendClient.putPaint(paint.id, paintData);

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

export { Paint }
