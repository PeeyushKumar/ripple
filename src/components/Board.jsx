import React, {Component} from 'react';
import Help from './Help'
import Panel from './Panel';
import Node from './Node';


class Board extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            grid: [[]],
            noOfRows: null,
            noOfCols: null,

            startRow: null,
            startCol: null,
            endRow: null,
            endCol: null,
            
            showHelp: false,
            found: false,
            drawingWall: false,

            savedRow: null,
            savedCol: null
        }
    }

    componentDidMount = () => {
        this.createGrid();

        window.addEventListener('resize', this.createGrid);
    }

    createGrid = () => {
        const width = window.innerWidth * 0.9;
        const height = window.innerHeight * 0.8;

        const ratio = width/height;

        const noOfRows = Math.floor(height/37);
        const noOfCols = Math.floor(noOfRows*ratio);

        let startCol = Math.floor(noOfCols/2 - noOfCols/4)
        let startRow = Math.floor(noOfRows/2)-1

        let endCol = Math.floor(noOfCols/2 + noOfCols/4)
        let endRow = Math.floor(noOfRows/2)-1


        const grid = [];
        for (let rowIdx=0; rowIdx<noOfRows; rowIdx++) {
            const row = []
            for (let nodeIdx=0; nodeIdx<noOfCols; nodeIdx++) {
                const node = {
                    row: rowIdx,
                    col: nodeIdx,
                    isStart: rowIdx === startRow && nodeIdx === startCol,
                    isEnd: rowIdx === endRow && nodeIdx === endCol,
                    isWall: false,
                    isVisited: false,
                    isPicked: false
                }
                row.push(node);
            }
            grid.push(row);
        }

        this.setState({
            grid,
            noOfRows,
            noOfCols,     
            startRow,
            startCol,
            endRow,
            endCol       
        })
    } 

    reset = () => {
        const {grid, noOfRows, noOfCols} = this.state;

        for(let rowIdx=0; rowIdx<noOfRows; rowIdx++) {
            for (let nodeIdx=0; nodeIdx<noOfCols; nodeIdx++) {
                grid[rowIdx][nodeIdx].isWall = false;
                grid[rowIdx][nodeIdx].isVisited = false;
            }
        }

        this.setState({
            grid,
            found: false,
            drawingWall: false,
        })
    }

    showHelp = () => {
        this.setState({
            showHelp: true
        })
    }

    closeHelp = () => {
        this.setState({
            showHelp: false
        })
    }

    isValidIndex = (row, col) => {
        const {noOfRows, noOfCols} = this.state;

        return (row >= 0 && row < noOfRows && col >= 0 && col < noOfCols)
    }

    startSearching = () => {
        const {grid, startRow, startCol} = this.state;

        this.explore(grid, startRow, startCol);        
    }

    explore = (grid, fromRow, fromCol) => {

        if (!this.isValidIndex(fromRow,fromCol)) return;

        const currentNode = grid[fromRow][fromCol];

        if (currentNode.isEnd) {
            this.setState({
                found : true
            })
        }
        
        if (this.state.found || currentNode.isVisited || currentNode.isWall) return;

        currentNode.isVisited = true;
        grid[fromRow][fromCol] = currentNode;

        this.setState({
            grid
        })

        setTimeout(() => {
            this.explore(grid, fromRow, fromCol+1);
            this.explore(grid, fromRow+1, fromCol);
            this.explore(grid, fromRow, fromCol-1);
            this.explore(grid, fromRow-1, fromCol);            
        }, 1);
    }

    handleOnMouseUp = (row, col) => {
        let {grid, startRow, startCol, savedRow, savedCol} = this.state;

        this.setState({
            drawingWall: false
        })

        if (savedRow === null || savedCol === null) return;
        if (grid[row][col].isStart || grid[row][col].isEnd) return;
        
        grid[row][col].isStart = grid[savedRow][savedCol].isStart;
        grid[row][col].isEnd = grid[savedRow][savedCol].isEnd;
        grid[row][col].isWall = false;

        if (grid[savedRow][savedCol].isStart) {
            startRow = row;
            startCol = col;
        } 

        grid[savedRow][savedCol].isStart = false;
        grid[savedRow][savedCol].isEnd = false;
        grid[savedRow][savedCol].isPicked = false;

        this.setState({
            grid,
            startRow,
            startCol,
            savedRow: null,
            savedCol: null
        })   
    }

    handleOnMouseDown = (row, col) => {
        const {grid, savedRow, savedCol} = this.state;

        if (!grid[row][col].isStart && !grid[row][col].isEnd) {
            grid[row][col].isWall = true;
            grid[row][col].isVisited = false;
            this.setState({
                drawingWall: true
            })
            return;
        }

        if (savedRow !== null || savedCol !== null) return;

        grid[row][col].isPicked = true;
        
        this.setState({
            grid,
            savedRow: row,
            savedCol: col
        })
    }

    handleOnMouseEnter = (row, col) => {

        const {grid, drawingWall} = this.state; 

        if (!drawingWall) return;

        if (grid[row][col].isStart || grid[row][col].isEnd) return;

        grid[row][col].isWall = true;
        grid[row][col].isVisited = false;

        this.setState({
            grid
        })
    }

    render() {
        const {grid} = this.state;

        return (
            <div>
                <Help
                    closeHelp={this.closeHelp}
                    show={this.state.showHelp}
                ></Help>

                <Panel
                    showHelp={this.showHelp}
                    startSearching={this.startSearching}
                    reset={this.reset}
                ></Panel>
                
                <div className="node-group">
                    {
                        grid.map((row, rowIdx) => (
                            <div key={rowIdx} className="node-row">{
                            row.map((node, nodeIdx) => (
                                <Node
                                    {...node}
                                    key={nodeIdx}
                                    handleOnMouseUp={this.handleOnMouseUp}
                                    handleOnMouseDown={this.handleOnMouseDown}
                                    handleOnMouseEnter={this.handleOnMouseEnter}
                                ></Node>
                            ))}
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Board;
