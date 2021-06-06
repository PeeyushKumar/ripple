import React, {Component} from 'react'

class Tile extends Component {
    
    render() {
        const id = this.props.id;
        const type = this.props.type;
        const visited = this.props.visited;

        let className = "tile";

        if (type === "start") {
            className += " tile-start";
        }

        else if (type === "end") {
            className += " tile-end";
        }

        else if (visited === true) {
            className += " tile-visited";
        }

        return(
            <button
                onMouseUp={() => this.props.handleNodeDrop(id)}
                onMouseDown={() => this.props.handleNodePick(id)}
                className={className}
            ></button>
        );
    }
}

export default Tile;