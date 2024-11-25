import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const {
          query: { id },
          method,
        } = req;
        const response = await prisma.cliente.findUnique({
          where: {
            id: +id,
          },
        })
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }

    case "DELETE":

      try {
        const {
          query: { id },
          method,
        } = req;

        const response = await prisma.cliente.delete({
          where: {
            id: +id,
          },
        })
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
      case 'PUT': {
        try {
          console.log('Putttt');
          const { body: data } = req;
          const { query: { id } } = req;
          console.log(data, id)
          const response = await prisma.cliente.update({
            where: {
              id: +id,
            },
            data: data
          })
          return res.status(204).json(response);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
  
      }
    default:
      res.setHeaders("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
}


