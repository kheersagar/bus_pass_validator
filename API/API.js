import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import getValue from "../hooks/getValue";
import storeValue from "../hooks/storeValue";
import { loginActions } from "../Slices/loginSlice";
import { userActions } from "../Slices/userSlice";
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { studentActions } from "../Slices/studentSlice";
import store from "../store/Index"
import deleteValue from "../hooks/deleteValue";
const API = axios.create({
  // baseURL : 'http://192.168.1.35:5000/'
  baseURL : 'https://bus-pass-server.onrender.com/'
})

API.interceptors.request.use( async (req)=>{
  const token = await getValue('isAuth')
    console.log(token)
    if(token){
      console.log()
      req.headers['x-access-token'] = token
    }
    return req
})
API.interceptors.response.use(async (res) => {
  if(res.headers['x-access-token']){
    storeValue('isAuth', res.headers['x-access-token'])
  }
  return res
},async (err)=>{
  console.log("erarr")
  console.log(err.response.headers)
  if(err.response.headers.logout){
    Toast.show({
      type:ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Session expired please login again',
      button: 'close',
    })
    store.dispatch(userActions.setAuth(false))
    deleteValue('isAuth')
    navigate('Login')
  }
  return Promise.reject(err)
})
export const LoginUser = (data,navigate)=>{
  return async (dispatch) =>{
    dispatch(loginActions.setLoading(true))
    try{
      const res = await API.post("/auth/validator/login",data)
      storeValue('isAuth',res.data.token)
        dispatch(userActions.setAuth(res.data.token))
        dispatch(userActions.setUserData(res.data.data))
        navigate.navigate("Home")
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Invalid username or password',
        button: 'close',
      })
    }finally{
      dispatch(loginActions.setLoading(false))
    }
  }
}
export const Logout = () =>{
  return async (dispatch) =>{
    try{
      dispatch(userActions.setLogout(true))
      const res = await API.get("/auth/logout");
      deleteValue("isAuth");
      dispatch(userActions.setAuth(false))
    }catch(err){
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.response.data,
        button: 'close',
      })
    }finally{
      dispatch(userActions.setLogout(false))
    }
  }
}
export const getUserData = () =>{
  return async (dispatch) =>{
    try{
      const res = await API.get("/user");
      dispatch(userActions.setUserData(res.data))
    }catch(err){
      console.log(err)
    }
  }
}
export const applyBussPass = (data,receipt_img) =>{
  return async (dispatch) =>{
    try{
      dispatch(userActions.setApplyLoading(true))
      const refs = ref(storage, `/receipts/${(Math.random() + 1).toString(36).substring(2)}`);
  
      //convert array of bytes
      const img = await fetch(receipt_img[0].uri);
      const bytes = await img.blob();
  
      // console.log(bytes);
  
      await uploadBytes(refs, bytes);
      const imageUrl  = await getDownloadURL(refs)
      const newData = {...data}
      newData['receipt_img'] = imageUrl
      if (imageUrl) {
          const res = await API.post("/bus-pass/apply",newData);
          console.log(res.data);
          dispatch(userActions.setUserData(res.data))
          Toast.show({
            type:ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Applied Successfully',
            button: 'close',
          })
      }
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.message,
        button: 'close',
      })
    }finally{
      dispatch(userActions.setApplyLoading(false))

    }
  }
}
export const getBusPass = (id) =>{
 return async (dispatch) =>{
  try{
    dispatch(userActions.setBusPassLoading(true))
    const res = await API.get(`/bus-pass/validator/get-pass?bus_pass_id=${id}`);
    dispatch(userActions.setBusPassDetails(res.data))
  }catch(err){
    Toast.show({
      type:ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: err.response.data,
      button: 'close',
    })
  }finally{
    dispatch(userActions.setBusPassLoading(false))
  }
}
}

export const getNotification = () =>{
  return async (dispatch) =>{
    try{
      dispatch(userActions.setNotificationsLoading(true))
      const res = await API.get('/user/notification');
      dispatch(userActions.setNotifications(res.data))
    }catch(err){
      console.log(err)
    }finally{
      dispatch(userActions.setNotificationsLoading(true))
    }
  }
}

export const updateProfileImage = (profileImage) =>{
  return async (dispatch) =>{
    try{
      dispatch(userActions.setProfileLoading(true))
      const refs = ref(storage, `/profileImg/${(Math.random() + 1).toString(36).substring(2)}`);
          //convert array of bytes
          const img = await fetch(profileImage);
          const bytes = await img.blob();
      
          // console.log(bytes);
      
          await uploadBytes(refs, bytes);
          const imageUrl  = await getDownloadURL(refs);
          if(imageUrl){
            const res = await API.post("/user/update-validator-profile",{
              profile_img : imageUrl
            })
            dispatch(userActions.setUserData(res.data))
          }
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.message,
        button: 'close',
      })
      return
    }finally{
      dispatch(userActions.setProfileLoading(false))
    }
  }
}
export const forgotPassowrd = (data,navigate) =>{
  return async (dispatch) =>{
    dispatch(loginActions.setLoading(true))
    try{
      const res = await API.get(`/auth/forgot-password?email=${data.email}`)
      dispatch(loginActions.setIsOtp(true)  )
      Toast.show({
        type:ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: res.data,
        button: 'close',
      })
    }catch(err){
      
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.message,
        button: 'close',
      })
    }finally{
      dispatch(loginActions.setLoading(false))
    }
  }
}
export const confirmPassowrd = (data,navigate) =>{
  return async (dispatch) =>{
    dispatch(loginActions.setLoading(true))
    try{
      const res = await API.post('/auth/confirm-password',data)
      Toast.show({
        type:ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: "Updated Successfully",
        button: 'close',
      })
      dispatch(loginActions.setIsOtp(false))
      navigate.navigate("Login") 
    }catch(err){
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.response.data,
        button: 'close',
      })
    }finally{
      dispatch(loginActions.setLoading(false))
    }
  }
}

export const searchQuery = (data,page) =>{
  return async (dispatch) =>{
    try{
      dispatch(studentActions.setDataIsLoading(true))
      const res = await API.get(`/bus-pass/pass-list?page=${page}&limit=10&search=${data}`)
      dispatch(studentActions.setQueryData({data:res.data,page}))
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.message,
        button: 'close',
      })
    }finally{
      dispatch(studentActions.setDataIsLoading(false))
    }
  }
}