import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  debugger
  switch (method) {
    case "GET":
      try {
        const {
          query: { idProceso },
          method,
        } = req;
        const response = await prisma.procesoAtributo.findMany({
          where: {
            idProceso,
          },
          include: {
            proceso: true,
            atributo: true,
          },
        })
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }

    case "POST":
      const { body: data } = req;
      const { atributoProcesoIds, procesoId } = data;
      if (!Array.isArray(atributoProcesoIds)) {
        return res.status(400).json({ error: "Los IDs de atributo deben ser un array." });
      }
      try {
        // Obtener las relaciones existentes
        const existingRelations = await prisma.procesoAtributo.findMany({
          where: {
            procesoId,
          },
        });

        const existingIds = existingRelations.map((relation) => relation.atributoProcesoId);

        // Eliminar relaciones que ya no están presentes
        const toDeleteIds = existingIds.filter((id) => !atributoProcesoIds.includes(id));
        await prisma.procesoAtributo.deleteMany({
          where: {
            procesoId,
            atributoProcesoId: {
              in: toDeleteIds,
            },
          },
        });

        // Crear nuevas relaciones para los IDs que no existen
        const toCreateIds = atributoProcesoIds.filter((id) => !existingIds.includes(id));
        const newRelations = await Promise.all(
          toCreateIds.map(async (atributoProcesoId) => {
            return await prisma.procesoAtributo.create({
              data: {
                procesoId,
                atributoProcesoId,
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
        .end(`Method ${method} Not Allowed`);
  }
}


