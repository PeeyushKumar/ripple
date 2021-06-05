    import React, {Component} from 'react';
    import Tile from './Tile'

    class Board extends Component {

        constructor(props) {
            super(props);
            
            const count = this.props.count;

            const tiles = [];
            for (let i=0; i<count; i++) {
                const newProps = {
                    id : i,
                    color : 'cyan',
                }
                tiles.push(newProps);
            }

            this.state = {
                tiles
            }
        }

        handleClick = (clickedId) => {
            const tiles = this.state.tiles;
            const visited = [];
            this.changeNeighbours(tiles, clickedId, visited);        
        }

        changeNeighbours = (tiles, idToChange, visited) => {

            const rows = this.props.rows;
            const cols = this.props.cols;
            const count = this.props.count;

            if (visited.includes(idToChange) || idToChange < 0 || idToChange >= count) {
                return;
            }
            visited.push(idToChange);
            this.change(tiles, idToChange);
            this.setState(tiles);
            setTimeout(() => {
                this.changeNeighbours(tiles, idToChange+1, visited);
                this.changeNeighbours(tiles, idToChange-1, visited);
                this.changeNeighbours(tiles, idToChange-cols, visited);
                this.changeNeighbours(tiles, idToChange+cols, visited);
            }, 10);
        }

        change = (tiles, idToChange) => {
            if (tiles[idToChange].color == 'cyan') {
                tiles[idToChange].color = 'red'
            } else {
                tiles[idToChange].color = 'cyan'
            }
        }

        render() {
            return (
                <div className="board">
                    {
                        this.state.tiles.map( tile => <Tile {...tile} key={tile.id} handleClick={this.handleClick}> </Tile>)
                    }
                </div>
            );
        }
    }

    export default Board;