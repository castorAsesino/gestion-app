/*
  Warnings:

  - You are about to drop the column `descripcion` on the `Matriz_Evaluacion` table. All the data in the column will be lost.
  - You are about to drop the column `detalle_matriz_evaluacionId` on the `Matriz_Evaluacion` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Matriz_Evaluacion` table. All the data in the column will be lost.
  - You are about to drop the `Detalle_Matriz_Evaluacion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `calificacion` to the `Matriz_Evaluacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivelId` to the `Matriz_Evaluacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procesoId` to the `Matriz_Evaluacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proyectoId` to the `Matriz_Evaluacion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Detalle_Matriz_Evaluacion" DROP CONSTRAINT "Detalle_Matriz_Evaluacion_atributoProcesoId_fkey";

-- DropForeignKey
ALTER TABLE "Detalle_Matriz_Evaluacion" DROP CONSTRAINT "Detalle_Matriz_Evaluacion_calificacionId_fkey";

-- DropForeignKey
ALTER TABLE "Matriz_Evaluacion" DROP CONSTRAINT "Matriz_Evaluacion_detalle_matriz_evaluacionId_fkey";

-- AlterTable
ALTER TABLE "Matriz_Evaluacion" DROP COLUMN "descripcion",
DROP COLUMN "detalle_matriz_evaluacionId",
DROP COLUMN "nombre",
ADD COLUMN     "calificacion" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "nivelId" INTEGER NOT NULL,
ADD COLUMN     "procesoId" INTEGER NOT NULL,
ADD COLUMN     "proyectoId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Detalle_Matriz_Evaluacion";

-- CreateTable
CREATE TABLE "MatrizEvaluacionAtributo" (
    "id" SERIAL NOT NULL,
    "matrizEvaluacionId" INTEGER NOT NULL,
    "atributoDeProcesoId" INTEGER NOT NULL,

    CONSTRAINT "MatrizEvaluacionAtributo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatrizEvaluacionAtributo_matrizEvaluacionId_atributoDeProce_key" ON "MatrizEvaluacionAtributo"("matrizEvaluacionId", "atributoDeProcesoId");

-- AddForeignKey
ALTER TABLE "Matriz_Evaluacion" ADD CONSTRAINT "Matriz_Evaluacion_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "Niveles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matriz_Evaluacion" ADD CONSTRAINT "Matriz_Evaluacion_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matriz_Evaluacion" ADD CONSTRAINT "Matriz_Evaluacion_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatrizEvaluacionAtributo" ADD CONSTRAINT "MatrizEvaluacionAtributo_matrizEvaluacionId_fkey" FOREIGN KEY ("matrizEvaluacionId") REFERENCES "Matriz_Evaluacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatrizEvaluacionAtributo" ADD CONSTRAINT "MatrizEvaluacionAtributo_atributoDeProcesoId_fkey" FOREIGN KEY ("atributoDeProcesoId") REFERENCES "Atributo_De_Proceso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
