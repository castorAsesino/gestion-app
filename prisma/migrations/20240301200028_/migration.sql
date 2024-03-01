-- CreateTable
CREATE TABLE "Proyecto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "presupuesto" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proceso" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proceso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atributo_De_Proceso" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atributo_De_Proceso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "procesoId" INTEGER NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escala_Calificacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Escala_Calificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Niveles" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "valorMax" INTEGER NOT NULL,
    "valorMin" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Niveles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matriz_Evaluacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detalle_matriz_evaluacionId" INTEGER NOT NULL,

    CONSTRAINT "Matriz_Evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detalle_Matriz_Evaluacion" (
    "id" SERIAL NOT NULL,
    "atributoProcesoId" INTEGER NOT NULL,
    "calificacionId" INTEGER NOT NULL,
    "porcentaje" DOUBLE PRECISION,

    CONSTRAINT "Detalle_Matriz_Evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcesoAtributo" (
    "id" SERIAL NOT NULL,
    "procesoId" INTEGER NOT NULL,
    "atributoProcesoId" INTEGER NOT NULL,

    CONSTRAINT "ProcesoAtributo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matriz_Evaluacion" ADD CONSTRAINT "Matriz_Evaluacion_detalle_matriz_evaluacionId_fkey" FOREIGN KEY ("detalle_matriz_evaluacionId") REFERENCES "Detalle_Matriz_Evaluacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle_Matriz_Evaluacion" ADD CONSTRAINT "Detalle_Matriz_Evaluacion_atributoProcesoId_fkey" FOREIGN KEY ("atributoProcesoId") REFERENCES "Atributo_De_Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle_Matriz_Evaluacion" ADD CONSTRAINT "Detalle_Matriz_Evaluacion_calificacionId_fkey" FOREIGN KEY ("calificacionId") REFERENCES "Escala_Calificacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcesoAtributo" ADD CONSTRAINT "ProcesoAtributo_procesoId_fkey" FOREIGN KEY ("procesoId") REFERENCES "Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcesoAtributo" ADD CONSTRAINT "ProcesoAtributo_atributoProcesoId_fkey" FOREIGN KEY ("atributoProcesoId") REFERENCES "Atributo_De_Proceso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
