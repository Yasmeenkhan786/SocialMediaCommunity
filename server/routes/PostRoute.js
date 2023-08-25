import express from 'express'
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from '../controllers/PostController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
import singleUpload from '../utils/upload.js'
const router = express.Router()

router.post('/',singleUpload,createPost)
router.get('/', getPost)
router.put('/:id',authMiddleWare, updatePost)
router.patch('/:id/delete', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)

export default router