import React from "react";
import s from "./ProfileStatus.module.css"

class ProfileStatus extends React.Component {

    state = {
        isEditMode: false,
        status: this.props.status
    };

    activateEditMode = () => {
        this.setState({
            isEditMode: true
        });
    }
    deactivateEditMode = () => {
        this.setState({
            isEditMode: false
        });
        this.props.updateStatus(this.state.status);
    }
    onChangeStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("componentDidUpdate", this.props.status, prevProps.status);
        if (this.props.status !== prevProps.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return <div className={"status"}>
            {
                !this.state.isEditMode
                ?
                    <div className="status-text" onDoubleClick={ this.activateEditMode }>
                        <p>{ this.props.status || "установить статус" }</p>
                    </div>
                :
                    <div className={s.statusCreator} onBlur={ this.deactivateEditMode }>
                        <div className="status-creator__inner">
                            <div className="form-group">
                                <input autoFocus={true}
                                       value={this.state.status}
                                       type="text"
                                       onChange={ this.onChangeStatus }
                                />
                            </div>
                            <div className="form-group">
                                <button className="drButton">Сохранить</button>
                            </div>
                        </div>
                    </div>
            }
        </div>;
    }
}

export default ProfileStatus;
