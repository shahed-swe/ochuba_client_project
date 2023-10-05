// import SimpleToast from 'react-native-simple-toast';
import axios from 'axios';
// import { setLoader } from '../Redux/Reducers/gernalSlice';
import { BASE_URL } from '../Utils/baseUrl';
import { message } from 'antd';




function getUrl(route, baseurl) {
    if (baseurl == false) {
        return route;
    } else {
        return `${BASE_URL}${route}`
    }
}


async function getToken() {
    const token = await localStorage.getItem("token")
    return token
}

const apiCall = async (method, payload, route, baseurl, onSuccess, onError, stopLoader) => {
    try {
        const url = getUrl(route, baseurl);
        let response = null
        const token = await getToken();
        let config = {
            method: method,
            maxBodyLength: Infinity,
            data: payload,
            url: url,
            headers:
                token ? { 'x-sh-auth': token } : null,
        };
        response = await axios.request(config);
        if (response?.data?.code == 200) {
            onSuccess(response.data);
            // stopLoader && store.dispatch(setLoader(false));
            return { status: 200, response: response.data };
        } else {
            onError(response);
            // SimpleToast.show(typeof e.response?.data.message == 'string' ? e.response?.data.message : 'Server error');
            // stopLoader && store.dispatch(setLoader(false));
            return response;
        }
    }
    catch (e) {
        // SimpleToast.show(typeof e.response?.data.message == 'string' ? e.response?.data.message : 'Server error');
        onError(e.response?.data);

        const token = await getToken()

        if (token && e?.response?.status == "401") {
            message.error("Token Expir")
            localStorage.clear()
            window.location = "/"
        }
        // store.dispatch(setLoader(false));
        return {
            status: 400,
            response: e?.response?.data ? e?.response?.data : { message: e.toString() },
        };
    }
}

export const getRequest = async (payload, route, baseurl, onSuccess = (res) => { }, onError = (err) => { }, stopLoader = true) => {
    await apiCall('get', payload, route, baseurl, onSuccess, onError, stopLoader);
};

export const postRequest = async (payload, route, baseurl, onSuccess = (res) => { }, onError = (err) => { }, stopLoader = true) => {
    console.log(payload, "payload")
    await apiCall('post', payload, route, baseurl, onSuccess, onError, stopLoader);
};

export const patchRequest = async (payload, route, baseurl, onSuccess = (res) => { }, onError = (err) => { }, stopLoader = true) => {
    await apiCall('patch', payload, route, baseurl, onSuccess, onError, stopLoader);
};

export const putRequest = async (payload, route, baseurl, onSuccess = () => { }, onError = () => { }, stopLoader = true) => {
    await apiCall('put', payload, route, baseurl, onSuccess, onError, stopLoader);
};

export const deleteRequest = async (payload, route, baseurl, onSuccess = (res) => { }, onError = (err) => { }) => {
    await apiCall('delete', payload, route, baseurl, onSuccess, onError, stopLoader);
};

export const putRequestFormData = async (payload, route, baseurl, onSuccess = (res) => { }, onError = (res) => { }, stopLoader = true) => {
    try {

        const url = getUrl(route, baseurl);
        const formData = new FormData();
        const token = await getToken();
        let response = null;
        const headers = {
            'Content-Type': 'multipart/form-data',
            'x-sh-auth': token
        };
        for (let key in payload) {
            formData.append(key, payload[key])
        }
        response = await axios.put(url, formData, { headers })
        if (response?.data?.code == 200) {
            onSuccess(response.data);
            // stopLoader && store.dispatch(setLoader(false));
            return { status: 200, response: response.data };
        } else {
            onError(response);
            // stopLoader && store.dispatch(setLoader(false));
            return response;
        }
    }
    catch (e) {
        onError(e);
        console.log('__post request form data error', e.response?.data)
        const token = await getToken()

        if (token && e?.response?.status == "401") {
            message.error("Token Expir")
            localStorage.clear()
            window.location = "/"
        }
        if (!token) {
            message.error("Token Expir")
            localStorage.clear()
            window.location = "/"
        }
        // SimpleToast.show(typeof e.response?.data.message == 'string' ? e.response?.data.message : 'Server error');
        return {
            status: 400,
            response: e?.response?.data ? e?.response?.data : { message: e.toString() },
        };
    }
};


export const postRequestFormData = async (payload, route, baseurl, onSuccess = (res) => { }, onError = (res) => { }, stopLoader = true) => {
    try {

        const url = getUrl(route, baseurl);
        const formData = new FormData();
        const token = await getToken();
        let response = null;

        for (let key in payload) {
            formData.append(key, payload[key])
        }


        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            data: formData,
            url: url,
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-sh-auth': token
            }
        }
        console.log('configs are', config)

        // const headers = {
        //     'Content-Type': 'multipart/form-data',
        //     'x-sh-auth': token
        // };



        response = await axios.request(config);

        // response = await axios.post(url, formData, { headers })


        if (response?.data?.code == 200) {
            onSuccess(response.data);
            // stopLoader && store.dispatch(setLoader(false));
            return { status: 200, response: response.data };
        } else {
            // console.log('error___', response)
            onError(response);
            // stopLoader && store.dispatch(setLoader(false));
            return response;
        }
    }
    catch (e) {
        onError(e);
        console.log('__post request form data error', e.response?.data)
        const token = await getToken()
        if (token && e?.response?.status == "401") {
            message.error("Token Expir")
            localStorage.clear()
            window.location = "/"
        }
        // stopLoader && store.dispatch(setLoader(false));
        // SimpleToast.show(typeof e.response?.data.message == 'string' ? e.response?.data.message : 'Server error');
        return {
            status: 400,
            response: e?.response?.data ? e?.response?.data : { message: e.toString() },
        };
    }
};

