import {FieldData} from "../FieldData";

export const Cell = (props: {
    fieldData: FieldData,
    onClick: Function,
    onContext: Function
}) => {

    return(
        <button onClick={e => props.onClick(props.fieldData)} onContextMenu={e => props.onContext(e, props.fieldData)}>
            {props.fieldData.isFlagged ? " Flag" : "-"}
        </button>
    )
}