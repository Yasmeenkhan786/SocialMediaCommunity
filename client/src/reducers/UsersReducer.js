const usersReducer = (states = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.data;
      case "UPDATING_SUCCESS":
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        return states.map((state) => state._id === action.data._id ? action.data : state);
        case "UPDATING_PHOTO_SUCCESS":
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        return states.map((state) => state._id === action.data._id ? action.data : state);
      
    default:
      return states;
  }
};
export default usersReducer;
