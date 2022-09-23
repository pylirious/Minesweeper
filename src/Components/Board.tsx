import React, {useEffect, useState} from "react";
import {FieldData} from "../FieldData";
import {Cell} from "./Cell";


export const Board = (props: {
    mines: number,
    width: number,
    height: number
}) => {

    const [boardData, setBoardData] = useState(() => initBoardData(props.width, props.height, props.mines));
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [revealed, setRevealed] = useState(0);

    let startTime: number;

    useEffect(() => {
        startTime = Date.now();
        const timer = setInterval(() => { // Creates an interval which will update the current data every minute
            // This will trigger a rerender every component that uses the useDate hook.
            setTimer(Date.now() - startTime);
        }, 1000);
        return () => {
            clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        }
    }, []);

    const handleContext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, field: FieldData) => {
        e.preventDefault();
        if (gameOver) {
            return;
        }

        let updatedData = [...boardData];
        updatedData[field.x][field.y].isFlagged = !updatedData[field.x][field.y].isFlagged;

        setBoardData(updatedData);
        return false;
    }

    const handleClick = (field: FieldData, manual: boolean) => {
        if (gameOver) {
            return;
        }


        let updatedData = [...boardData];

        if (updatedData[field.x][field.y].isFlagged) {
            return;
        }
        if (!updatedData[field.x][field.y].isRevealed){
            updatedData[field.x][field.y].isRevealed = true;

            if (updatedData[field.x][field.y].isMine) {
                setEndTime(timer);
                setGameOver(true);
                return;
            }

            setRevealed(revealed +1);
            console.log(revealed);
            if (revealed >= (props.width * props.height) - props.mines) {
                alert("You Won!");
                setEndTime(timer);
                setGameOver(true);
            }

            if (updatedData[field.x][field.y].neighbours === 0) {
                traverseField(updatedData, field.x, field.y, props.height, props.width).forEach(n => {
                    handleClick(n, false);
                })
            }

            setBoardData(updatedData);
        }
        else {
            if (manual) {
                console.log("Manual!!!");
                let flags = 0
                let neighbour = traverseField(updatedData, field.x, field.y, props.height, props.width);
                neighbour.forEach(n => {
                    if (n.isFlagged)
                        flags++;
                })
                if (flags >= updatedData[field.x][field.y].neighbours) {
                    neighbour.forEach(n => handleClick(n, false))
                }
            }
            return;

        }


    }

    return (
        <div style={{
            transform: `scale(${10 / props.height}, ${10 / props.height})`,
        }}>
            <div style={{
                border: "30px solid white",
                borderRightColor: "gray",
                borderBottomColor: "gray",
            }}>
                <div style={{
                    border: "10px solid",
                    borderTopColor: "gray",
                    borderLeftColor: "gray",
                    borderBottomColor: "white",
                    borderRightColor: "white",
                    display: "grid",
                    gridTemplateRows: `repeat(${props.height}, minmax(0, 1fr));`,
                    gridTemplateColumns: `repeat(${props.width}, minmax(0, 1fr));`,
                    gridAutoFlow: "column",

                    outline: "20px solid lightgray",
                }}>
                    {boardData.map(rows => {
                        return (
                            <div>
                                {rows.map(item => {

                                    return (
                                        <Cell fieldData={item} onClick={handleClick} onContext={handleContext}
                                              gameOver={gameOver}/>
                                    )
                                })}

                            </div>

                        )
                    })}
                    <br/>
                </div>
            </div>
            <span>
                {gameOver ? `GAME OVER | Time: ${Math.trunc(endTime / 1000)}` : "Time: " + Math.trunc(timer / 1000)}

            </span>
        </div>


    );


}
const initBoardData = (width: number, height: number, mines: number) => {

    console.warn("Initiating Board");
    let data: FieldData[][] = [];

    for (let i = 0; i < width; i++) {
        data.push([]);
        for (let g = 0; g < height; g++) {
            data[i][g] = {
                x: i,
                y: g,
                isMine: false,
                neighbours: 0,
                isRevealed: false,
                isEmpty: false,
                isFlagged: false,
            };
        }
    }
    console.log("Finished creating basic board");
    //todo: place mines
    data = placeMines(data, mines, height, width);

    //todo: calculate neighbours
    data = calcNeighbours(data, height, width);
    return data;
}
const placeMines = (data: FieldData[][], mineSum: number, height: number, width: number) => {
    let minesPlanted = 0;
    while (minesPlanted < mineSum) {
        let ranX = Math.trunc(Math.random() * width);
        let ranY = Math.trunc(Math.random() * height);
        if (!(data[ranX][ranY].isMine)) {
            data[ranX][ranY].isMine = true;
            minesPlanted++;
        }
    }
    return data;
}

const getMines = (data: FieldData[][]) => {
    let mineArray: FieldData[] = [];
    data.forEach(rows => rows.forEach(
        item => {
            if (item.isMine) {
                mineArray.push(item);
            }
        }
    ));
    return mineArray;
}

const traverseField = (data: FieldData[][], x: number, y: number, height: number, width: number) => {
    if (x === 0) {
        console.log(`Mine at: x${x} y${y}`);
    }
    let neighbours: FieldData[] = [];

    if (x > 0) {
        neighbours.push(data[x - 1][y]);
        if (y > 0) {
            neighbours.push(data[x - 1][y - 1]);
            //neighbours.push(data[x][y - 1]);
        }
        if (y < height - 1) {
            neighbours.push(data[x - 1][y + 1]);
            //neighbours.push(data[x][y + 1]);
        }
    }
    if (x < width - 1) {
        neighbours.push(data[x + 1][y]);
        if (y > 0) {
            neighbours.push(data[x + 1][y - 1]);
        }
        if (y < height - 1) {
            neighbours.push(data[x + 1][y + 1]);
        }
    }
    if (y < height - 1) {
        neighbours.push(data[x][y + 1]);
    }
    if (y > 0) {
        neighbours.push(data[x][y - 1]);
    }

    return neighbours;
}

const calcNeighbours = (data: FieldData[][], height: number, width: number) => {
    let mines = getMines(data);
    mines.forEach(mine => {
        let neighbours = traverseField(data, mine.x, mine.y, height, width);
        neighbours.forEach(neighbour => data[neighbour.x][neighbour.y].neighbours++);
    });
    return data;
}

