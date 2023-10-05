//     // import SimpleToast from 'react-native-simple-toast';
// import axios from 'axios';
// import { BASE_URL } from '../Utils/BaseUrl';
// // import { setLoader } from '../Redux/Reducers/gernalSlice';




// function getUrl(route: any, baseurl: any) {
//     if (baseurl == false) {
//         return route;
//     } else {
//         return `${BASE_URL}${route}`
//     }
// }


// async function getToken() {
//     const token = await localStorage.getItem("adminToken")
//     return token
// }

// const apiCall = async (method: any, payload: any, route: any, baseurl: any, onSuccess: any, onError: any,
//     // stopLoader:any
// ) => {

//     try {
//         const url = getUrl(route, baseurl);
//         let response = null
//         const token = await getToken();
//         let config: any = {
//             method: method,
//             maxBodyLength: Infinity,
//             data: payload,
//             url: url,
//             headers:
//                 token ? { 'x-sh-auth': token } : null,
//         };
//         response = await axios.request(config);
//         if (response?.data?.code == 200) {
//             onSuccess(response.data);
//             // stopLoader && store.dispatch(setLoader(false));
//             return { status: 200, response: response.data };
//         } else {
//             onError(response);
//             // SimpleToast.show(typeof e.response?.data.message == 'string' ? e.response?.data.message : 'Server error');
//             // stopLoader && store.dispatch(setLoader(false));
//             return response;
//         }
//     }
//     catch (e: any) {
//         // SimpleToast.show(typeof e.response?.data.message == 'string' ? e.response?.data.message : 'Server error');
//         onError(e.response?.data);
//         // store.dispatch(setLoader(false));
//         return {
//             status: 400,
//             response: e?.response?.data ? e?.response?.data : { message: e.toString() },
//         };
//     }
// }

// export const getRequest = async (payload: any, route: any, baseurl: any, onSuccess: any = () => { }, onError: any = () => { },) => {
//     await apiCall('get', payload, route, baseurl, onSuccess, onError);
// };

// export const postRequest = async (payload: any, route: any, baseurl: any, onSuccess: any = () => { }, onError: any = () => { },) => {
//     await apiCall('post', payload, route, baseurl, onSuccess, onError);
// };

// export const patchRequest = async (payload: any, route: any, baseurl: any, onSuccess: any = () => { }, onError: any = () => { },) => {
//     await apiCall('patch', payload, route, baseurl, onSuccess, onError);
// };

// export const putRequest = async (payload: any, route: any, baseurl: any, onSuccess: any = () => { }, onError: any = () => { },) => {
//     await apiCall('put', payload, route, baseurl, onSuccess, onError);
// };

// export const deleteRequest = async (payload: any, route: any, baseurl: any, onSuccess: any = () => { }, onError: any = () => { },) => {
//     await apiCall('delete', payload, route, baseurl, onSuccess, onError);
// };

// export const putRequestFormData = async (payload: any, route: any, baseurl: any, onSuccess: any = () => { }, onError: any = () => { }) => {
//     try {

//         const url = getUrl(route, baseurl);
//         const formData = new FormData();
//         const token = await getToken();
//         let response = null;
//         const headers = {
//             'Content-Type': 'multipart/form-data',
//             'x-sh-auth': token
//         };
//         for (let key in payload) {
//             formData.append(key, payload[key])
//         }
//         response = await axios.put(url, formData, { headers })
//         if (response?.data?.code == 200) {
//             onSuccess(response.data);
//             // stopLoader && store.dispatch(setLoader(false));
//             return { status: 200, response: response.data };
//         } else {
//             onError(response);
//             // stopLoader && store.dispatch(setLoader(false));
//             return response;
//         }
//     }
//     catch (e: any) {
//         onError(e);
//         console.log('__post request form data error', e.response?.data)
//         // SimpleToast.show(typeof e.response?.data.message == 'string' ? e.response?.data.message : 'Server error');
//         return {
//             status: 400,
//             response: e?.response?.data ? e?.response?.data : { message: e.toString() },
//         };
//     }
// };


// export const postRequestFormData = async (payload: any, route: any, baseurl: any, onSuccess: (res: any) => void = () => { }, onError: (res: any) => void = () => { }) => {
//     try {

//         const url = getUrl(route, baseurl);
//         const formData = new FormData();
//         const token = await getToken();
//         let response = null;

//         for (let key in payload) {
//             formData.append(key, payload[key])
//         }

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             data: formData,
//             url: url,
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 'x-sh-auth': token
//             }
//         }
//         console.log('configs are', config)

//         // const headers = {
//         //     'Content-Type': 'multipart/form-data',
//         //     'x-sh-auth': token
//         // };



//         response = await axios.request(config);

//         // response = await axios.post(url, formData, { headers })


//         if (response?.data?.code == 200) {
//             onSuccess(response.data);
//             // stopLoader && store.dispatch(setLoader(false));
//             return { status: 200, response: response.data };
//         } else {
//             // console.log('error___', response)
//             onError(response);
//             // stopLoader && store.dispatch(setLoader(false));
//             return response;
//         }
//     }
//     catch (e: any) {
//         onError(e);
//         console.log('__post request form data error', e.response?.data)
//         // stopLoader && store.dispatch(setLoader(false));
//         // SimpleToast.show(typeof e.response?.data.message == 'string' ? e.response?.data.message : 'Server error');
//         return {
//             status: 400,
//             response: e?.response?.data ? e?.response?.data : { message: e.toString() },
//         };
//     }
// };

