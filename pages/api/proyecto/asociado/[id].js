import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const {
          query: { idProyecto },
          method,
        } = req;
        const response = await prisma.proyectoProceso.findMany({
          where: {
            idProyecto,
          },
          include: {
            proyecto: true,
            proceso: true,
          },
        });
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }

    case "POST":
      const { body: data } = req;
      const { procesoIds, proyectoId } = data;
      if (!Array.isArray(procesoIds)) {
        return res.status(400).json({ error: "Los IDs de proceso deben ser un array." });
      }
      try {
        // Obtener las relaciones existentes
        const existingRelations = await prisma.proyectoProceso.findMany({
          where: {
            proyectoId,
          },
        });

        const existingIds = existingRelations.map((relation) => relation.procesoId);

        // Eliminar relaciones que ya no están presentes
        const toDeleteIds = existingIds.filter((id) => !procesoIds.includes(id));
        await prisma.proyectoProceso.deleteMany({
          where: {
            proyectoId,
            procesoId: {
              in: toDeleteIds,
            },
          },
        });

        // Crear nuevas relaciones para los IDs que no existen
        const toCreateIds = procesoIds.filter((id) => !existingIds.includes(id));
        const newRelations = await Promise.all(
          toCreateIds.map(async (procesoId) => {
            return await prisma.proyectoProceso.create({
              data: {
                proyectoId,
                procesoId,
              },
            });
          })
        );

        const updatedRelations = [...existingRelations, ...newRelations];

        res.status(200).json(updatedRelations);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar las relaciones." });
      }

    default:
      res.setHeaders("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ success: false })
        .end(`Método ${method} No Permitido`);
  }
}