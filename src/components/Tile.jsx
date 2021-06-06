import React, {Component} from 'react'

class Tile extends Component {
    render() {
        const id = this.props.id;
        const color = this.props.color;

        let className = "tile";
        className += " tile-" + color;
            
        return(
            <button
                onClick={() => {
                    className += " bounce"
                    this.props.handleClick(id)
                }}
                className={className}
            ></button>
        );
    }
}

export default Tile;