import React from "react";
import { Paint } from "./paint";

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

export { Lanes, LaneSelectForm }
