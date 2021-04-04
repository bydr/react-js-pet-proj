import React from "react";
import s from "./Preloader.module.css"

const Preloader = () => {
    return <div className={s.preloader}>
        <div className={s.preloaderContent}>
            <div className={s.preloaderGraphic}>
                <svg className={s.loader} version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="15" fill="transparent" stroke="#f00" strokeWidth="3">
                        <animateTransform attributeName="transform"
                                          type="rotate"
                                          from="0 20 20" to="360 20 20"
                                          begin="0s" dur="5s"
                                          repeatCount="indefinite"
                        />
                    </circle>
                </svg>
            </div>
        </div>
    </div>
};

export default Preloader;
