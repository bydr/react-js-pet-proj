import {instance} from "./api";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
            .then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
            .then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status })
            .then(res => res.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    }
};
