// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import chatBot from 'vanilla-feishu-robot'

type Data = {
    name: string
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
    const {type, data} = req.body
    if (!type || type !== 'new_comment') {
        res.status(200)
        return
    }
    const {by_nickname, by_email, content, page_id, page_title, project_title, approve_link} = data
    const feishuBot = new chatBot({
        webhook: process.env.FEISHU_WEBHOOK_URL,
        secret: process.env.FEISHU_SECRET,
    })

    const message = {
        "zh_cn": {
            "title": `New comment on "${project_title}"`,
            "content": [
                [
                    {
                        "tag": "text",
                        "text": `${by_nickname}|${by_email} comments in page "${page_title}" `
                    },
                    {
                        "tag": "text",
                        "text": content
                    },

                    {
                        "tag": "a",
                        "text": "Approve/Reply Here",
                        "href": approve_link
                    },
                    // {
                    //   "tag": "at",
                    //   "user_id": "ou_18eac8********17ad4f02e8bbbb"
                    // }
                ]
            ]
        }
    }
    feishuBot.richText(message)
    res.status(200)
}
