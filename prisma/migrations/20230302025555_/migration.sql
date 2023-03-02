/*
  Warnings:

  - Added the required column `presupuesto` to the `Proyecto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proyecto` ADD COLUMN `presupuesto` INTEGER NOT NULL;
