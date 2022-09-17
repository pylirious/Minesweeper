import {FieldData} from "../FieldData";

export const Cell = (props: {
    fieldData: FieldData,
    onClick: Function,
    onContext: Function
}) => {

    return(
        <div className={"cell"} id={props.fieldData.isRevealed ? "revealed" : ""} onClick={e => props.onClick(props.fieldData)} onContextMenu={e => props.onContext(e, props.fieldData)}>
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