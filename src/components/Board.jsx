import React, {Component} from 'react';
import Help from './Help'
import Panel from './Panel';
import Cell from './Cell';


class Board extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            grid: null,
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
            erazingWall: false,
            movingStart: false,
            movingEnd: false,   
        }

        this.defaultCell = {
            row: null,
            col: null,
            isWall: false,
            isVisited: false,
            isPath: false,
            parentRow: null,
            parentCol: null,
        }
    }

    componentDidMount = () => {
        this.createGrid();

        window.addEventListener('resize', this.createGrid);
    }

    createGrid = (startRow=null, startCol=null, endRow=null, endCol=null) => {

        const width = window.innerWidth * 0.9;
        const height = window.innerHeight * 0.8;

        const ratio = width/height;

        const noOfRows = Math.floor(height/45);
        const noOfCols = Math.floor(noOfRows*ratio);


        if (!(startRow && startCol && endRow && endCol)) {
            startCol = Math.floor(noOfCols/2 - noOfCols/4)
            startRow = Math.floor(noOfRows/2)-1
    
            endCol = Math.floor(noOfCols/2 + noOfCols/4)
            endRow = Math.floor(noOfRows/2)-1
        }

        const grid = [];
        for (let i=0; i<noOfRows; i++) {
            const row = []
            for (let j=0; j<noOfCols; j++) {
                const cell = {
                    ...this.defaultCell,
                    row: i,
                    col: j,
                }
                row.push(cell);
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
            endCol,
            searching: false,
            tracking: false
        })
    } 

    reset = () => {
        const {startRow, startCol, endRow, endCol} = this.state;
        this.createGrid(startRow, startCol, endRow, endCol);
    }

    clearSearch = (grid) => {

        const changes = {
            isVisited: false,
            isPath: false,
            parentRow: null,
            parentCol: null
        }

        grid = grid.map(cellRow => cellRow.map(cell => ({...cell, ...changes})));
        return grid;
    }

    toggleHelp = () => {
        this.setState({
            showHelp: !this.state.showHelp
        })
    }

    isValidIndex = (row, col) => {
        const {noOfRows, noOfCols} = this.state;

        return (row >= 0 && row < noOfRows && col >= 0 && col < noOfCols)
    }

    isStart = (row, col) => {
        const {startRow, startCol} = this.state;

        return (row === startRow && col === startCol);
    }

    isEnd = (row, col) => {
        const {endRow, endCol} = this.state;

        return (row === endRow && col === endCol);
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

        const currentCell = grid[fromRow][fromCol];

        if (this.isEnd(currentCell.row, currentCell.col)) {
            currentCell.parentRow = parentRow;
            currentCell.parentCol = parentCol;
            grid[fromRow][fromCol] = currentCell;
            
            this.setState({
                grid,
                searching : false
            })
            
            if (this.state.tracking) return;
            
            this.track(currentCell.row, currentCell.col)
            this.setState({
                tracking: true
            })
            
        }
        
        if (!this.state.searching || currentCell.isVisited || currentCell.isWall) return;

        currentCell.isVisited = true;
        currentCell.parentRow = parentRow;
        currentCell.parentCol = parentCol;
        grid[fromRow][fromCol] = currentCell;

        this.setState({
            grid
        })

        setTimeout(() => {
            this.explore(grid, fromRow, fromCol+1, fromRow, fromCol);        
        }, 10);
        setTimeout(() => {
            this.explore(grid, fromRow+1, fromCol, fromRow, fromCol);
        }, 10);
        setTimeout(() => {
            this.explore(grid, fromRow, fromCol-1, fromRow, fromCol);
        }, 10);
        setTimeout(() => {
            this.explore(grid, fromRow-1, fromCol, fromRow, fromCol);            
        }, 10);

    }

    track = (row, col) => {
        const {grid} = this.state;
        const path = []
        while (!this.isStart(row, col)) {
            const parentRow = grid[row][col].parentRow;
            const parentCol = grid[row][col].parentCol;
            row = parentRow;
            col = parentCol;
            path.unshift(grid[row][col]);
        }

        const makePath = (grid, path, i) => {
            if (i >= path.length) {
                this.setState({
                    tracking: false
                })
                return;
            }

            if (!this.state.tracking) return;

            const cell = path[i];
            const row = cell.row;
            const col = cell.col;
            grid[row][col].isPath = true;
            this.setState({
                grid
            })
            setTimeout(() => {
                makePath(grid, path, i+1)
            }, 15);
        }

        this.setState({
            tracking: true
        })

        makePath(grid, path, 1);
    }

    changeCell = (grid, row, col, changes) => {
        return grid.map((cellRow, i) => cellRow.map((cell, j) => ((i === row && j === col) ? {...cell, ...changes} : cell)));
    }

    erazeCell = (grid, row, col) => {

        const changes = {
            ...this.defaultCell,
            row,
            col
        }

        grid = this.changeCell(grid, row, col, changes)
        return grid;
    }

    clearCell = (grid, row, col) => {

        const changes = {
            isVisited: false,
            isPath: false,
            parentRow: null,
            parentCol: null
        }

        grid = this.changeCell(grid, row, col, changes);
        return grid;
    }

    makeWall = (grid, row, col) => {
        
        const changes = {
            ...this.defaultCell,
            row,
            col,
            isWall: true
        }
        
        grid = this.changeCell(grid, row, col, changes);
        return grid;
    }

    handleOnMouseUp = () => {
        this.setState({
            drawingWall: false,
            movingStart: false,
            movingEnd: false,
            erazingWall: false
        })
    }

    handleOnMouseDown = (row, col) => {
        let {grid, drawingWall, erazingWall, movingStart, movingEnd} = this.state;

        if (this.isStart(row, col)) {
            if (!drawingWall && !erazingWall && !movingEnd) {
                movingStart = true;
            }  
        }

        else if (this.isEnd(row, col)) {
            if (!drawingWall && !erazingWall && !movingStart) {
                movingEnd = true;
            }
        }

        else if (grid[row][col].isWall) {
            if (!drawingWall && !movingStart && !movingEnd) {
                grid = this.erazeCell(grid, row, col);
                erazingWall = true;
            }
        }

        else {
            if (!erazingWall && !movingStart && !movingEnd) {
                grid = this.makeWall(grid, row, col)
                drawingWall = true;
            }
        }

        grid = this.clearSearch(grid);

        this.setState({
            grid,
            movingStart,
            movingEnd,
            drawingWall,
            erazingWall,
            searching: false,
            tracking: false
        })
    }

    handleOnMouseEnter = (row, col) => {

        let {grid, startRow, startCol, endRow, endCol, movingStart, movingEnd, drawingWall, erazingWall} = this.state; 
        
        if (this.isStart(row, col) || this.isEnd(row, col)) return;

        else if (grid[row][col].isWall) {
            if (erazingWall) grid = this.erazeCell(grid, row, col);
        }

        else if (movingStart) {
            startRow = row;
            startCol = col;
        }

        else if (movingEnd) {
            endRow = row;
            endCol = col;
        }

        else if (drawingWall) grid = this.makeWall(grid, row, col);

        this.setState({
            grid,
            startRow,
            startCol,
            endRow,
            endCol
        });
    }

    render() {
        const {grid} = this.state;

        return (
            <div 
                onContextMenu={e => e.preventDefault()}
                onMouseUp={this.handleOnMouseUp}
                className="board"
            >
                <Help
                    toggleHelp={this.toggleHelp}
                    show={this.state.showHelp}
                ></Help>

                <Panel
                    toggleHelp={this.toggleHelp}
                    startSearching={this.startSearching}
                    reset={this.reset}
                ></Panel>

                {
                    this.state.grid === null ?
                    'Loading...' :
                    <div className="cell-group">
                    {
                        grid.map((cellRow, i) => (
                            <div key={i} className="cell-row">{
                                cellRow.map((cell, j) => (
                                    <Cell
                                        {...cell}
                                        key={j}
                                        isStart={this.isStart(i, j)}
                                        isEnd={this.isEnd(i, j)}
                                        movingStart={this.state.movingStart}
                                        movingEnd={this.state.movingEnd}
                                        handleOnMouseDown={this.handleOnMouseDown}
                                        handleOnMouseEnter={this.handleOnMouseEnter}
                                    ></Cell>
                                ))}
                            </div>
                        ))
                    }
                    </div>
                }

            </div>
        );
    }
}

export default Board;
