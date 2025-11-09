-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `Blog_authorUsername_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_authorUsername_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_blogId_fkey`;

-- DropIndex
DROP INDEX `Blog_authorUsername_fkey` ON `blog`;

-- DropIndex
DROP INDEX `Comment_authorUsername_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Comment_blogId_fkey` ON `comment`;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_authorUsername_fkey` FOREIGN KEY (`authorUsername`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_authorUsername_fkey` FOREIGN KEY (`authorUsername`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
