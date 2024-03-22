import { createRoot, Container } from "react-dom/client";

import { Component } from "react";

class Hello extends Component {
    render(): JSX.Element {
        return(
            <p>Hello World!</p>
        )
    }
}

const domNode = document.getElementById("root") as Container;
const root = createRoot(domNode);

root.render(<Hello />);