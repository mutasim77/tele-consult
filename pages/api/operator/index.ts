import type { NextApiRequest, NextApiResponse } from 'next';
import { mockData } from '@/lib/constants';

type ResponseData = {
    message: string;
    user?: {
        phoneNumber: string;
        name: string;
    };
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'GET') {
        const { phoneNumber } = req.query;

        if (typeof phoneNumber !== 'string') {
            return res.status(400).json({ message: 'Invalid phone number format' });
        }
        const user = mockData.find(user => user.phoneNumber === phoneNumber.trim());

        if (user) {
            return res.status(200).json({ message: 'User found', user });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
