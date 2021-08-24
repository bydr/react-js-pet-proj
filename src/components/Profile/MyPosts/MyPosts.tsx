import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import * as React from "react";
import AddPostForm from "./AddPostForm/AddPostForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {actions} from "../../../redux/profile-reducer";
import {ReactNode, useEffect, useState} from "react";

type TAdPostFormObject = {
    postMessage: string
}

const MyPosts: React.FC = (props) => {
    let posts = useSelector((state: AppStateType) => state.profilePage.posts);
    let postElements = posts.map(p => <Post key={p.id} post={p}/>);
    const dispatch = useDispatch();

    let onAddPost = (values: TAdPostFormObject) => {
        dispatch(actions.addPost(values.postMessage));
    };

    return (
        <div className={s.myposts}>
            <div className={s.mypostsInner}>
                <div className={s.title}>My Posts</div>
                <AddPostForm onSubmit={onAddPost} />
                <div className={s.posts}>{ postElements }</div>
            </div>
        </div>
    );
}

export default MyPosts;
