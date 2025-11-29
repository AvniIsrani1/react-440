/*
  Warnings:

  - You are about to drop the `follows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `Follows_follower_fkey`;

-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `Follows_following_fkey`;

-- DropTable
DROP TABLE `follows`;

-- CreateTable
CREATE TABLE `Follow` (
    `follower` VARCHAR(191) NOT NULL,
    `following` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`follower`, `following`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_follower_fkey` FOREIGN KEY (`follower`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_following_fkey` FOREIGN KEY (`following`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
