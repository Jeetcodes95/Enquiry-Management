import { toast } from "react-toastify";

import axios from "axios";
import { SetUser, RemoveUser } from "../Reducers/userReducer";


 const HomeUser = () => async (dispatch) => {
    try {
        const res = await axios.get("/");
        dispatch(SetUser(res.data.user))
    } catch (error) {
        console.log(error.response.data.message);
    }
};

 const asyncCurrentUser = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/users/user");
        dispatch(SetUser(res.data.user));
        
    } catch (error) {
        console.log(error.response?.data?.message);
        
    }
};

 const asyncUserSignup = (user) => async (dispatch) => {
    try {
        const res = await axios.post("/api/users/signup", user);
        dispatch(asyncCurrentUser(res));
    } catch (error) {
        console.log(error.response?.data?.message);
       
    }
};

 const asyncUserSignin = (user) => async (dispatch) => {
    try {
        const res = await axios.post("/api/users/login", user)
        dispatch(asyncCurrentUser(res));
       
    } catch (error) {
        console.log(error.response?.data?.message);
    }
};

const asyncUserSignout = () => async (dispatch) => {
    try {
      const res = await axios.post("/api/users/logout", { withCredentials: true });
      dispatch(RemoveUser(res));
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };



export  { HomeUser, asyncUserSignup,asyncUserSignin,  asyncCurrentUser, asyncUserSignout};