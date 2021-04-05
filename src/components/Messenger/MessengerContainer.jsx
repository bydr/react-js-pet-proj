import * as React from "react";
import Messenger from "./Messenger";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class MessengerContainer extends React.Component {
    render() {
        return <Messenger {...this.props} />;
    }
}

let mapStateToProps = (state) => ({
    dialogs: state.messengerPage.dialogs,
    messages: state.messengerPage.messages
});


export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(MessengerContainer)
