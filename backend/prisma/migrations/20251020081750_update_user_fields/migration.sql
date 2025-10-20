/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `firstName` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `lastName` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `phone` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `username` VARCHAR(50) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `firstName` VARCHAR(50) NOT NULL,
    MODIFY `lastName` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `phone` VARCHAR(15) NOT NULL,
    ADD PRIMARY KEY (`username`);
