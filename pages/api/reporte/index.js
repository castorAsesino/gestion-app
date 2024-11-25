import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  
  const { method } = req;
  let buscar = false;
  switch (method) {

    case 'GET':
      
      try {
        const {
          query: { idProyecto, idProceso, nivelId },
          method,
        } = req;
        // Construir el objeto de condiciones de filtrado
        const whereConditions = { proyectoId: parseInt(idProyecto, 10) };

        if (idProceso) {
          whereConditions.procesoId = parseInt(idProceso, 10);
        }

        // Solo agregar nivelId si es un valor válido y no es 0
        if (nivelId !== undefined && parseInt(nivelId, 10) !== 0) {
          whereConditions.nivelId = parseInt(nivelId, 10);
        }

        const response = await prisma.matriz_Evaluacion.findMany({
          where: whereConditions,
          include: {
            Niveles: true,
            Proceso: true,
            Proyecto: true,
          },
        });

        if (response.length === 0) {
          return res.status(404).json({ message: 'No se encontraron datos con los parámetros proporcionados' });
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
