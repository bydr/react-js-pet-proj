import s from "./UploaderFile.module.css";
import React, {useEffect, useState} from "react";

const UploaderFile = ({isShowPopup, extendsClass, handlerUpload, hidePopup, ...props}) => {

    let [file, setFile] = useState(null);

    useEffect(() => {
        if (!isShowPopup) {
            clearFile();
        }
    }, [isShowPopup])

    let onChangeFile = ({target}) => {
        if (target.files.length) {
            setFile(target.files[0]);
        }
    };

    let createFileElement = (file) => {
        return <div className={s.fileItem}>
                <p className={s.fileItemName}>{ file.name }</p>
                <p className={s.fileItemSize}>{ formatSize(file.size) }</p>
            </div>;
    };

    let clearFile = () => {
        setFile(null);
    };

    let uploadFile = () => {
        handlerUpload(file);
        hidePopup();
    };

    let formatSize = (length) => {
        let i = 0, type = ['б','Кб','Мб','Гб','Тб','Пб'];
        while((length / 1000 | 0) && i < type.length - 1) {
            length /= 1024;
            i++;
        }
        return length.toFixed(2) + ' ' + type[i];
    }

    return <>
        <div className={`${s.uploadFile} ${extendsClass}`}>
            <label htmlFor="file">
                Изменить аватар
                <input type="file" id="file" name="file" onChange={onChangeFile}/>
            </label>
        </div>
        {
            file && <div className={s.uploadFileList}>
                { createFileElement(file) }
            </div>
        }
        {
            file && <div className={s.uploadFileControls}>
                <button onClick={uploadFile} className="btn-custom__accent">Загрузить</button>
                <button onClick={clearFile} className="btn-custom__accent btn-custom__gray">Отменить</button>
            </div>
        }
    </>;
};

export default UploaderFile;
