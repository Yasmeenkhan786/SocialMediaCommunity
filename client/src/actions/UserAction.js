import * as UserApi from "../api/UserRequests";

export const getAllUser = () => async (dispatch) => {
  try {
    const { data } = await UserApi.getAllUser();
    dispatch({ type: "FETCH_USERS", data: data }) 
  } catch (error) {
    console.log(error);
  }
  
};

export const updateUser=(id,userData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        const {data} = await UserApi.updateUser(id,userData);
        console.log("Action ko receive hoa hy ye : ",data)
        dispatch({type: "UPDATING_SUCCESS", data: data})
    }   
    catch(error){
      console.log(error)
        dispatch({type: "UPDATING_FAIL"})
    }
}
export const updateProfile=(id,formData)=> async(dispatch)=> {
  // dispatch({type: "UPDATING_START"})
  try{
      const {data} = await UserApi.updateProfile(id,formData);
      console.log("Image uploading: ",data)
      dispatch({type: "UPDATING_PHOTO_SUCCESS", data: data})
  }   
  catch(error){
    console.log(error)
      // dispatch({type: "UPDATING_FAIL"})
  }
}


export const followUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "FOLLOW_USER", data: id})
    UserApi.followUser(id, data)
}

export const unfollowUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "UNFOLLOW_USER", data: id})
    UserApi.unfollowUser(id, data)
}