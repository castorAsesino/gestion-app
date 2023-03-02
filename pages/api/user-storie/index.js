import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  debugger
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const response =
          await prisma.$queryRaw`    
          SELECT 
	us.id,
    us.story_points,
    t.nombre as nombreTarea,
    t.descripcion,
    s.nombre as nombreSprint,
    r.nombre as nombreRecurso
    FROM gestionapp.user_story as us
LEFT JOIN gestionapp.sprint as s ON s.id = us.sprintId
LEFT JOIN gestionapp.tarea as t ON t.id = us.tareaId
LEFT JOIN gestionapp.rol_recurso as rr ON rr.id = us.rol_recursoId
LEFT JOIN gestionapp.recurso as r ON r.id = rr.recursoId`
        // const response = await prisma.rol_recurso.findMany();
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }
    case "POST":
      try {
        const { body: data } = req;
        const response = await prisma.user_story.create({ data });
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


