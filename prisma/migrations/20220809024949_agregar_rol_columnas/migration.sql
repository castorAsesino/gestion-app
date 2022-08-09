/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `rol` table. All the data in the column will be lost.
  - Added the required column `codigo` to the `Rol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Rol` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rol` DROP COLUMN `usuarioId`,
    ADD COLUMN `codigo` VARCHAR(191) NOT NULL,
    ADD COLUMN `descripcion` VARCHAR(191) NOT NULL;
