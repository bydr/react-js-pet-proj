import Messages from "./Messages";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        messages: state.messengerPage.messages
    };
};
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;
