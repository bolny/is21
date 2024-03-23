import React from 'react';
import ReactDOM from 'react-dom';

function Hello() {
    return(
        <>
            <p>Hello World!</p>
        </>
    )
}

function App() {
    return (
        <div>
            <h1>Hello</h1>
            <Hello />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
