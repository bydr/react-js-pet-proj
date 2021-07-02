import * as React from "react";
import Messenger from "./Messenger";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {sendMessage} from "../../redux/messenger-reducer";
import {AppStateType} from "../../redux/redux-store";
import {DialogType, MessageType} from "../../types/types";

type MapStateToPropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>
};
type MapDispatchToPropsType = {
    sendMessage: (newMessageBody:string) => void
};
type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class MessengerContainer extends React.Component<PropsType> {
    render() {
        return <Messenger {...this.props} />;
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    dialogs: state.messengerPage.dialogs,
    messages: state.messengerPage.messages
});


export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps, {sendMessage}),
    withAuthRedirect
)(MessengerContainer)
