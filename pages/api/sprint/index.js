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
        s.id,
          s.nombre,
          s.descripcion,
          s.duracion,
          s.fecha_inicio,
          s.fecha_fin,
          s.goal,
          b.nombre as nombreBacklog
          FROM gestionapp.sprint as s
      LEFT JOIN gestionapp.backlog as b ON b.id = s.backlogId`


        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }
    case "POST":
      try {
        const { body: data } = req;
        const response = await prisma.sprint.create({ data });
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


