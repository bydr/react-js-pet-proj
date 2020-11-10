import s from "./Card.module.css"

const Card = () => {
    return (
        <div className={s.card}>
            <div className={s.content}>
                <div className={s.avatar}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt=""/>
                </div>
                <div className={s.info}>description</div>
            </div>
        </div>
    );
}

export default Card;
