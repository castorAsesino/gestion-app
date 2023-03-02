/*
  Warnings:

  - Added the required column `estado` to the `Rol` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rol` ADD COLUMN `estado` VARCHAR(191) NOT NULL;
