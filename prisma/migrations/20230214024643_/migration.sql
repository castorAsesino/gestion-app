/*
  Warnings:

  - You are about to drop the column `estado` on the `backlog` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `proceso` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `proyecto` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `recurso` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `rol` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `sprint` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `backlog` DROP COLUMN `estado`;

-- AlterTable
ALTER TABLE `proceso` DROP COLUMN `estado`;

-- AlterTable
ALTER TABLE `proyecto` DROP COLUMN `estado`;

-- AlterTable
ALTER TABLE `recurso` DROP COLUMN `estado`;

-- AlterTable
ALTER TABLE `rol` DROP COLUMN `estado`;

-- AlterTable
ALTER TABLE `sprint` DROP COLUMN `estado`;
