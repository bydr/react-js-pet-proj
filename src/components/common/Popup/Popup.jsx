import React, {useState} from "react";
import s from "./Popup.module.css"

const Popup = ({children, hidePopup, isShow}) => {
    return <div className={`${s.popupContainer} ${isShow && s.isActive}`}>
        <div className={s.popupContent}> {children} </div>
        <div onClick={hidePopup} className={s.popupOverlay}></div>
    </div>
};

export default Popup;
