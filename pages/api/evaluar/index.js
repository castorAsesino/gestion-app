import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        try {
          const { calificacion, nivelId, procesoId, proyectoId, atributos } = req.body;

          // Crear la entrada de Matriz_Evaluacion
          const matrizEvaluacion = await prisma.matriz_Evaluacion.create({
            data: {
              calificacion,
              nivelId,
              procesoId,
              proyectoId,
              atributos: {
                create: atributos.map(attr => ({
                  Atributo_De_Proceso: {
                    connect: { id: attr.id }
                  }
                })),
              },
            },
          });

          return res.status(201).json(matrizEvaluacion);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }

      case 'GET':
        try {
          const { proyectoId, nivelId, procesoId } = req.query;

          const filters = {};
          if (proyectoId) {
            filters.proyectoId = parseInt(proyectoId, 10);
          }
          if (nivelId) {
            filters.nivelId = parseInt(nivelId, 10);
          }
          if (procesoId) {
            filters.procesoId = parseInt(procesoId, 10);
          }

          const matrizEvaluacion = await prisma.matriz_Evaluacion.findMany({
            where: filters,
            include: {
              Niveles: true,
              Proceso: true,
              Proyecto: true,
              atributos: {
                include: {
                  Atributo_De_Proceso: true,
                },
              },
            },
          });

          if (matrizEvaluacion.length === 0) {
            return res.status(404).json({ message: 'No se encontraron datos para los filtros proporcionados' });
          }

          return res.status(200).json(matrizEvaluacion);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }

      default:
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    // Cerrar la conexión de Prisma
    await prisma.$disconnect();
  }
}
