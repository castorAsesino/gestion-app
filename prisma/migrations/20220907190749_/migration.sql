/*
  Warnings:

  - Added the required column `descripcion` to the `Backlog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `backlog` ADD COLUMN `descripcion` VARCHAR(191) NOT NULL;
