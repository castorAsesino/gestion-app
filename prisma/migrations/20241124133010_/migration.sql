-- AlterTable
ALTER TABLE "Proyecto" ADD COLUMN     "duracion" INTEGER,
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'En progreso',
ADD COLUMN     "recursos" INTEGER,
ADD COLUMN     "responsable" TEXT;
