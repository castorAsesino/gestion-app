import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    
    case 'GET':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: 'id es requerido' });
        }

        const response = await prisma.proyectoProceso.findMany({
          where: { proyectoId: parseInt(id, 10) },
          include: {
            proceso: true,
            proyecto: true,
          },
        });

        if (response.length === 0) {
          return res.status(404).json({ message: 'No se encontraron datos para el ProyectoId proporcionado' });
        }

        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
