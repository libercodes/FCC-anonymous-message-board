import { RequestHandler } from 'express'
import mongoose from 'mongoose'
import Thread, { IThread } from '../model/Thread'
import Reply from '../model/Reply'

//THREADS

export const GetThreads: RequestHandler = async( req, res, next ) => {
    const { board } = req.params
    try {
        const threads = await Thread
        .find({ board: board })
        .select('text created_on bumped_on replies replyCount board')
        .limit(10)
        .populate({
            path: 'replies',
            options: {
                limit: 3,
                sort: { created_on: -1 }
            }
        })
        res.json(threads)
    } catch (error) {
        console.log(error)
    }
}

export const AddThread: RequestHandler = async( req, res, next ) => {
    const { text, delete_password } : { text: string, delete_password: string } = req.body
    const board = req.params.board
    const objThread = new Thread({ text, delete_password, board: board })
    try {
        const savedThread: IThread = await objThread.save()
        res.json(`saved thread ${savedThread.id} on board ${board}`)
        
    } catch (error) {
        console.error(error)
    }


}

export const ReportThread: RequestHandler = async( req, res, next ) => {
    const { thread_id } : { thread_id: string } = req.body
    try {
        const foundThread = await Thread.findById(thread_id)
        if(foundThread){
            foundThread.reported = true
            const updatedThread = await foundThread.save()
            res.json(`success`)
        } else {
            res.json(`thread not found`)
        }
    } catch (error) {
        console.error(error)
    }
}

export const DeleteThread: RequestHandler = async( req, res, next ) => {
    const { thread_id, board } = req.params
    const { delete_password } = req.query
    try {
        const foundThread = await Thread.findById(thread_id)
        if(delete_password == foundThread.delete_password) {
            const deletedThread = await Thread.findByIdAndDelete(thread_id)
            if(deletedThread){
                res.json(`success`)
            } else {
                res.json(`thread not found`)
            }
        } else {
            res.json(`incorrect password`)
        }
    } catch (error) {
        console.error()
    }
}

//REPLIES

export const GetReplies: RequestHandler = async( req, res, next ) => {
    const { thread_id } = req.query
    try {
        const threadWithReplies = await Thread
            .findById(thread_id)
            .select('text created_on bumped_on replies replyCount board')
            .populate('replies')
            
        if(threadWithReplies){
            res.json(threadWithReplies)
        } else {
            res.json('thread not found')
        }
    } catch (error) {
        console.error(error)
    }
}

export const AddReply: RequestHandler = async( req, res, next ) => {
    const { text, delete_password, thread_id } : { text: string, delete_password: string, thread_id: string } = req.body

    const objReply = new Reply({ text, delete_password})
    try {
        const savedReply = await objReply.save()
        const foundThread = await Thread.findById(thread_id)
        if(foundThread){
            foundThread.bumped_on = new Date()
            foundThread.replies = [ 
                ...foundThread.replies,
                savedReply._id
            ]
            const updatedThread = await foundThread.save()
            res.json(`Added reply to ${updatedThread.id}`)
        } else {
            res.json(`thread not found`)
        }
    } catch (error) {
        console.error(error)
    }
}

export const ReportReply: RequestHandler = async( req, res, next ) => {
    const { reply_id, thread_id } : { reply_id: string, thread_id: string } = req.body

    try {
        const foundReply  = await Reply.findById(reply_id)
        if(foundReply){
            foundReply.reported = true
            const updatedReply = await foundReply.save()
            res.json(`success`)
        } else {
            res.json(`reply not found`)
        }
    } catch (error) {
        console.error(error)
    }

}

export const DeleteReply: RequestHandler = async( req, res, next ) => {
    const { thread_id, reply_id } = req.params
    const { delete_password } = req.query

    try {
        const foundReply = await Reply.findById(reply_id)
        if(foundReply) {
            if(foundReply.delete_password == delete_password) {
                foundReply.text = '[deleted]'
                await foundReply.save()
                res.json('success')
            } else {
                res.json('incorrect password')
            }
        } else {
            res.json('reply not found')
        }
    } catch (error) {
        console.error(error)
    }

}