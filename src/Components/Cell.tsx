import {FieldData} from "../FieldData";

export const Cell = (props: {
    fieldData: FieldData,
    onClick: Function,
    onContext: Function,
    gameOver: boolean
}) => {

    return(
        <div className={"cell"} id={props.fieldData.isRevealed ? "revealed" : ""} onClick={e => props.onClick(props.fieldData, true)} onContextMenu={e => props.onContext(e, props.fieldData)} style={getStyle(props.fieldData, props.gameOver)}>
            <div className={"innerCell"}>
                {getView(props.fieldData)}
            </div>
        </div>
    )
}

const getView = (field: FieldData) => {
    if(field.isRevealed){
        if(field.isMine){
            return "💣";
        }
        if(field.neighbours === 0){
            return "";
        }
        return field.neighbours;
    }else{
        if(field.isFlagged){
            return "🚩";
        }
        return ""
    }
}

const getStyle = (field: FieldData, gameOver: boolean) =>{
    let style = {
        color: "",
        backgroundColor: "lightgrey"
    };
    switch (field.neighbours) {
        case 1:
            style.color = "blue"
            break;
        case 2:
            style.color = "green"
            break;
        case 3:
            style.color = "red"
            break;
        case 4:
            style.color = "darkblue"

            break;
        case 5:
            style.color = "darkred"
            break;
        case 6:
            style.color = "turquoise"
            break;
        case 7:
            style.color = "purple"
            break;
        case 8:
            style.color = "gray"
            break;
        default:
            break;
    }
    if(!field.isMine && field.isFlagged && gameOver){
        style.backgroundColor = "coral"
    }

    if(field.isRevealed){
        style.backgroundColor = "#c5c5c5"
    }
    return style;
}