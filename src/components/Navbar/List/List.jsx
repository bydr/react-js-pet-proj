import Item from "./Item/Item";


const List = (props) => {

    let itemsElements = props.list.map(l => <Item item={l}/>);

    return (
        <ul>
            {itemsElements}
        </ul>
    );
}

export default List;
