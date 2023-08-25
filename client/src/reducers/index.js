import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import usersReducer from "./UsersReducer";
import postsReducer from './PostsReducer'


export const reducers = combineReducers({authReducer,postReducer,usersReducer,postsReducer})