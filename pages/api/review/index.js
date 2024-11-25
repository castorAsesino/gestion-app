import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const response =
          await prisma.$queryRaw`    
          SELECT 
          r.nombre,
          r.descripcion,
          r.avance,
          r.conclusion, 
          s.nombre as nombreSprint 
          FROM gestionapp.review as r
          LEFT JOIN gestionapp.sprint as s ON s.id = r.sprintId`
        // const response = await prisma.rol_recurso.findMany();
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }
    case "POST":
      try {
        const { body: data } = req;
        const response = await prisma.review.create({ data });
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


