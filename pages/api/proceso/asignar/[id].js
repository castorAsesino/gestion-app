import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  
  switch (method) {
    case "GET":
      try {
        const {
          query: { id },
        } = req;
        
        const response = await prisma.procesoAtributo.findMany({
          where: {
            procesoId: +id,
          },
          include: {
            proceso: true,
            atributo: true,
          },
        });
        return res.status(200).json(response);
      } catch (error) {
        return res.status(400).json({ error });
      }finally {
        // Cerrar la conexión de Prisma
        await prisma.$disconnect();
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

        return res.status(200).json(updatedRelations);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al actualizar las relaciones." });
      } finally {
        // Cerrar la conexión de Prisma
        await prisma.$disconnect();
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]); // Corregido a res.setHeader
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
}
