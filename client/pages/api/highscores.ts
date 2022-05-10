import { fetchAPI } from "@lib/api"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            const { data } = await fetchAPI("/highscores", {
                sort: "score",
                pagination: {
                    pageSize: 10
                }
            })
            res.send(data)
            break
        case "POST":
            await fetchAPI("/highscores", {}, {
                method: "POST",
                body: JSON.stringify(req.body)
            })
            res.status(201).end()
    }
}
