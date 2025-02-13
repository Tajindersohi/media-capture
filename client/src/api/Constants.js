import axiosInstance from './axiosInstance';

const apiConstants = {
    admin:{
        login: async (data) => await axiosInstance.post('/admin/login', data),
    },
    media:{
        getList: async () => await axiosInstance.get('/media/list'),
        addMedia: async (data) =>
            await axiosInstance.post("/media/upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
    },
    user:{
        login: async (data) => await axiosInstance.post('/login',data),
        registerUser: async (data) => await axiosInstance.post('user/register', data),
        getMe: async () => await axiosInstance.post('/me'),
    },
    upload:{
        media: async (data) => await axiosInstance.post('/upload-media',data),
    }
};

export default apiConstants;
