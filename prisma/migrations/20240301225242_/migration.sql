-- CreateTable
CREATE TABLE "ProyectoProceso" (
    "id" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "procesoId" INTEGER NOT NULL,

    CONSTRAINT "ProyectoProceso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProyectoProceso" ADD CONSTRAINT "ProyectoProceso_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoProceso" ADD CONSTRAINT "ProyectoProceso_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
