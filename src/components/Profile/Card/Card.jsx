import s from "./Card.module.css"

const Card = () => {
    return (
        <div className={s.card}>
            <div className="profile-card__content">
                <div className="">ava</div>
                <div className="">description</div>
            </div>
        </div>
    );
}

export default Card;
