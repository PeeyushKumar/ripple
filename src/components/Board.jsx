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
            searching: false,
            tracking: false,
            drawingWall: false,

            savedRow: null,
            savedCol: null,
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
                    isPicked: false,
                    parentRow: null,
                    parentCol: null,
                    isPath: false
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
                grid[rowIdx][nodeIdx].isPath = false;
                grid[rowIdx][nodeIdx].parentRow = null;
                grid[rowIdx][nodeIdx].parentCol = null;
            }
        }

        this.setState({
            grid,
            searching: false,
            drawingWall: false,
        })
    }

    resetSearch = () => {
        const {grid, noOfRows, noOfCols} = this.state;

        for(let rowIdx=0; rowIdx<noOfRows; rowIdx++) {
            for (let nodeIdx=0; nodeIdx<noOfCols; nodeIdx++) {
                grid[rowIdx][nodeIdx].isVisited = false;
                grid[rowIdx][nodeIdx].isPath = false;
                grid[rowIdx][nodeIdx].parentRow = null;
                grid[rowIdx][nodeIdx].parentCol = null;
            }
        }

        this.setState({
            grid,
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

        this.setState({
            searching: true
        })

        setTimeout(() => {
            this.explore(grid, startRow, startCol);   
        }, 0);
    }

    explore = (grid, fromRow, fromCol, parentRow=null, parentCol=null) => {

        if (!this.isValidIndex(fromRow,fromCol)) return;

        const currentNode = grid[fromRow][fromCol];

        if (currentNode.isEnd) {
            currentNode.parentRow = parentRow;
            currentNode.parentCol = parentCol;
            grid[fromRow][fromCol] = currentNode;
            
            this.setState({
                grid,
                searching : false
            })
            
            if (this.state.tracking) return;
            
            this.track(currentNode.row, currentNode.col)
            this.setState({
                tracking: true
            })
            
        }
        
        if (!this.state.searching || currentNode.isVisited || currentNode.isWall) return;

        currentNode.isVisited = true;
        currentNode.parentRow = parentRow;
        currentNode.parentCol = parentCol;
        grid[fromRow][fromCol] = currentNode;

        this.setState({
            grid
        })

        setTimeout(() => {
            this.explore(grid, fromRow, fromCol+1, fromRow, fromCol);
            this.explore(grid, fromRow+1, fromCol, fromRow, fromCol);
            this.explore(grid, fromRow, fromCol-1, fromRow, fromCol);
            this.explore(grid, fromRow-1, fromCol, fromRow, fromCol);            
        }, 1);
    }

    track = (row, col) => {
        const {grid} = this.state;
        const path = []
        while (!grid[row][col].isStart) {
            path.unshift(grid[row][col]);
            const parentRow = grid[row][col].parentRow;
            const parentCol = grid[row][col].parentCol;
            row = parentRow;
            col = parentCol;
        }

        const travel = (grid, path, i) => {
            if (i >= path.length-1) return;

            const node = path[i];
            const row = node.row;
            const col = node.col;
            const {startRow, startCol} = this.state;
            
            grid[startRow][startCol].isStart = false;
            grid[row][col].isPath = false;
            grid[row][col].isStart = true;

            this.setState({
                grid,
                startRow: row,
                startCol: col,
            })
            setTimeout(() => {
                travel(grid, path, i+1)
            }, 10);
        }

        const makePath = (grid, path, i) => {
            if (i >= path.length) {
                this.setState({
                    tracking: false
                })
                travel(grid, path, 0);
                return;
            }

            const node = path[i];
            const row = node.row;
            const col = node.col;
            grid[row][col].isPath = true;
            this.setState({
                grid
            })
            setTimeout(() => {
                makePath(grid, path, i+1)
            }, 10);
        }

        let i = 0;
        makePath(grid, path, i);
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

        this.resetSearch();

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

        console.log(grid[row][col])


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
