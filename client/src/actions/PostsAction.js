import * as PostsApi from "../api/PostsRequests";

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost =await PostsApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const getPost = () => async(dispatch)=>{
  try {
    const {data} = await PostsApi.getPost()
    dispatch({type: "POST_RETREIVING_SUCCESS", data:data})
    
  } catch (error) {
    console.log(error)
  }
}
export const deletePost =(id , userId)=> async(dispatch)=>{
  try {
    const {data} = await PostsApi.deletePost (id,userId)
  } catch (error) {
    console.log(error)
  }
}
