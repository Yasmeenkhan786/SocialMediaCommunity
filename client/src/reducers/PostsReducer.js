const postsReducer = (state = [], action) => {
    switch (action.type) {
      case "POST_RETREIVING_SUCCESS":
        return action.data;
      default:
        return state;
    }
  };
  export default postsReducer;
  