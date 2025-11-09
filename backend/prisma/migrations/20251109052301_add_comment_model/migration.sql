-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `blog_authorUsername_fkey`;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_authorUsername_fkey` FOREIGN KEY (`authorUsername`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
