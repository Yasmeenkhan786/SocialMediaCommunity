import express from 'express'
import { deleteUser, followUser, getAllUser, getUser, unfollowUser, updateProfile, updateUser} from '../controllers/UserController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js';
import singleUpload from '../utils/upload.js';

const router = express.Router()

router.get('/:id', getUser);
router.get('/',getAllUser)
router.put('/:id',authMiddleWare,updateUser)
router.put('/:id/profile',authMiddleWare,singleUpload,updateProfile)
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)

export default router