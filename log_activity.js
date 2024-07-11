import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const db = client.db();
const collection = db.collection('activity_log');

export default async function logActivity(req: NextApiRequest, res: NextApiResponse) {
const { method, url, headers, body } = req;
const userAgent = headers['user-agent'];
const ip = req.socket.remoteAddress;
const activity = {
method,
url,
userAgent,
ip,
body: JSON.stringify(body),
createdAt: new Date()
};

try {
await collection.insertOne(activity);
} catch (error) {
console.error(error);
}

return res;
}
