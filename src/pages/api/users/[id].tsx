import { NextApiRequest, NextApiResponse} from 'next';

export default ( request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.query)

    const users = [
        {id: 1, name: "Abcd"},
        {id: 2, name: "Qwer"},
        {id: 3, name: "Zasd"},
    ]

    return response.json(users)
}