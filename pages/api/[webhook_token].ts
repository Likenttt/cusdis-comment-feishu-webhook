// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const chatBot = require('vanilla-feishu-robot');

type Data = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    /**
     * {
     *   "type": "new_comment",
     *   "data": {
     *     "by_nickname": "xxx",
     *     "by_email": "xxx",
     *     "content": "xxx",
     *     "page_id": "xxx",
     *     "page_title": "xxx", // page title, maybe NULL
     *     "project_title": "haha", // project title
     *     "approve_link": "" // use this link to approve this comment without login
     *   }
     * }
     */
        // req.query.webhook_token -> "c6f7764e5284feb3050c8fa6bp84b090a"
        // pages/api/[webhook_token].ts -> /api/c6f7764e5284feb3050c8fa6bp84b090a
        // req.query.webhook_token -> "c6f7764e5284feb3050c8fa6bp84b090a"
    const {webhook_token} = req.query
    // console.log('webhook_token is: ' + webhook_token)
    if (!webhook_token || webhook_token != process.env.WEBHOOK_TOKEN) {
        res.status(401).json({
            message: "FORBIDDEN"
        })
    }
    const {type, data} = JSON.parse(req.body)
    // console.log('req.body is: ' + JSON.stringify(req.body))
    //
    // console.log('type is: ' + type)
    // console.log('data is: ' + JSON.stringify(data))

    if (type && type == 'new_comment') {
        const {by_nickname, by_email, content, page_id, page_title, project_title, approve_link} = data
        const feishuBot = new chatBot({
            webhook: process.env.FEISHU_WEBHOOK_URL,
            secret: process.env.FEISHU_SECRET,
        })

        const message = {
            "zh_cn": {
                "title": `📮 "${project_title}" 新评论提醒`,
                "content": [
                    [
                        {
                            "tag": "text",
                            "text": `"${by_nickname}${by_email ? ('|' + by_email) : ''}" 在文章 "${page_title}"下发表了评论： `
                        },

                    ],
                    [
                        {
                            "tag": "text",
                            "text": ''
                        },

                    ],
                    [
                        {
                            "tag": "text",
                            "text": content
                        },

                        // {
                        //   "tag": "at",
                        //   "user_id": "ou_18eac8********17ad4f02e8bbbb"
                        // }
                    ],
                    [
                        {
                            "tag": "text",
                            "text": ''
                        },

                    ],
                    [{
                        "tag": "a",
                        "text": "审核/回复",
                        "href": approve_link
                    },]
                ]
            }
        }
        feishuBot.richText(message)
        res.status(200).json({
            message: "OJBK"
        })
    } else {
        res.status(200).json({
            message: "NOTHING PERFORMED"
        })
    }
}
