import s from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={s.item}>
            <div className={s.itemImage}>
                <img src="http://wallpapers-images.ru/1920x1080/nature/wallpapers/wallpapers-nature-013.jpg" alt=""/>
            </div>
            <div className={s.itemInfo}>
                <p className="">{props.post.message}</p>
            </div>
        </div>
    );
}

export default Post;
