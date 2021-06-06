import React, {Component} from 'react'

class Tile extends Component {
    
    render() {
        const id = this.props.id;
        const type = this.props.type;
        const picked = this.props.picked;

        let className = "tile";

        if (type === "start") {
            className += " tile-start";
        }

        else if (type === "end") {
            className += " tile-end";
        }

        else if (type === "empty") {
            className += " tile-empty";
        }

        else if (type === "wall") {
            className += " tile-wall"
        }

        else if (type === "visited") {
            className += " tile-visited";
        }

        if (picked) {
            className += " tile-picked"
        }



        return(
            <div
                onMouseUp={() => this.props.handleNodeDrop(id)}
                onMouseDown={() => this.props.handleNodePick(id)}
                onMouseEnter={() => this.props.handleMouseEnter(id)}
                className={className}
            ></div>
        );
    }
}

export default Tile;