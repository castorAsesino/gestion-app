import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  console.log('axios');
  switch (method) {
    case "GET":
      try {
        const response = await prisma.cliente.findMany();
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }
    case "POST":
      console.log('post api');
      try {
        const { body: data } = req;
        console.log('axios post: '+JSON.stringify(data));
        const response = await prisma.cliente.create({ data });
        return res.status(201).json(response);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
   
    default:
      res.setHeaders("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
}


