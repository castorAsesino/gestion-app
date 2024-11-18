/*
  Warnings:

  - Added the required column `nivelCapacidadId` to the `Matriz_Evaluacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Matriz_Evaluacion" ADD COLUMN     "nivelCapacidadId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Niveles_Capacidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Niveles_Capacidad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Matriz_Evaluacion" ADD CONSTRAINT "Matriz_Evaluacion_nivelCapacidadId_fkey" FOREIGN KEY ("nivelCapacidadId") REFERENCES "Niveles_Capacidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
