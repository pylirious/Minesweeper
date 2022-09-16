import React, {useState} from "react";
import {FieldData} from "../FieldData";
import {Cell} from "./Cell";


export const Board = (props:{
    mines:number,
    width:number,
    height:number
}) =>{

    const [boardData, setBoardData] = useState(() => initBoardData(props.width, props.height, props.mines));
    const [mineCount, setMineCount] = useState(props.mines);


    const handleContext = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>, field: FieldData) => {
        e.preventDefault();
        let updatedData = [...boardData];
        updatedData[field.x][field.y].isFlagged = true;

        setBoardData(updatedData);
        return false;
    }

    const handleClick = (field: FieldData) => {

    }

    return(

        <div>
            {boardData.map(rows =>{
                return(
                    <div>
                        {rows.map(item =>{

                    return(
                        <Cell fieldData={item} onClick={handleClick} onContext={handleContext}></Cell>
                    )
                })}
                        <br/>
                    </div>

                )
            })}
            <br/>
        </div>

    );
    
    
}
const initBoardData = (width:number, height:number, mines:number) => {

    console.warn("Initiating Board");
    let data:FieldData[][] = [];

    for(let i = 0; i < height; i++) {
        data.push([]);
        for (let g = 0; g < width; g++) {
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
    while(minesPlanted < mineSum){
        let ranX = Math.trunc(Math.random() * width);
        let ranY = Math.trunc(Math.random() * height);
        if(!(data[ranX][ranY].isMine)){
            data[ranX][ranY].isMine = true;
            minesPlanted++;
        }
    }
    return data;
}

const getMines = (data: FieldData[][]) => {
    let mineArray : FieldData[] = [];
    data.forEach(rows => rows.forEach(
        item => {
            if(item.isMine){
                mineArray.push(item);
            }
        }

    ));
    return mineArray;
}

const traverseField = (data: FieldData[][], x: number, y: number, height: number, width: number) => {
    let neighbours: FieldData[] = [];

    if(x > 0){
        neighbours.push(data[x-1][y]);
        if(y > 0){
            neighbours.push(data[x-1][y-1]);
            neighbours.push(data[x][y-1]);
        }
        if(y < height - 1){
            neighbours.push(data[x-1][y+1]);
            neighbours.push(data[x][y+1]);
        }
    }
    if(x < width - 1){
        neighbours.push(data[x+1][y]);
        if(y > 0){
            neighbours.push(data[x+1][y-1]);
        }
        if(y < height -1){
            neighbours.push(data[x+1][y+1]);
        }
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

