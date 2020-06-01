import { Router } from 'express'
import * as userController from '../controller/user'
const router: Router = Router()

//Threads
router.post('/threads/:board', userController.AddThread)
router.get('/threads/:board', userController.GetThreads)
router.put('/threads/:board', userController.ReportThread)
router.delete('/threads/:board/:thread_id', userController.DeleteThread)

//Replies
router.post('/replies/:board', userController.AddReply)
router.get('/replies/:board', userController.GetReplies)
router.put('/replies/:board', userController.ReportReply)
router.delete('/replies/:board/:thread_id/:reply_id', userController.DeleteThread)



export default Router