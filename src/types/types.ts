import {EnResultCodes} from "../api/api";

export type DialogType = {
    id: number,
    name: string
}
export type MessageType = {
    id: number,
    message: string
}

export type FriendType = {
    id: number,
    name: string
};
export type TFriendStateItem = {
    value: number | boolean;
    message: string;
};
export type NavbarItemType = {
    id: number,
    title: string,
    path: string
};

export type PhotosType = {
    small: string | null,
    large: string | null
};
export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
};

export type PostType = {
    id: number,
    message: string,
    likes: number
};
export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
};
export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
};
export type TResponse = {
    resultCode: EnResultCodes | number;
    messages: Array<string>,
    data: {}
};

export type TIsFriend = boolean | number | null;
