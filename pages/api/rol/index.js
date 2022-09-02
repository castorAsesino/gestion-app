import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  debugger
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const response = await prisma.rol.findMany();
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }
    case "POST":
      try {

        const response = await prisma.rol.create({ data });
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


