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
          b.id,
            b.nombre,
            b.descripcion,
            p.nombre as nombreProyecto
            FROM gestionapp.backlog as b
        LEFT JOIN gestionapp.proyecto as p ON p.id = b.proyectoId`
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }
    case "POST":
      try {
        const { body: data } = req;
        const response = await prisma.backlog.create({ data });
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


