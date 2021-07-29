import * as React from "react";
import Messenger from "./Messenger";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const MessengerPage: React.FC = (props) => {
    return <Messenger {...props} />;
}

export default compose(withAuthRedirect)(MessengerPage) as React.FC
