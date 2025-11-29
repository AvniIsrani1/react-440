-- CreateTable
CREATE TABLE `Follows` (
    `follower` VARCHAR(191) NOT NULL,
    `following` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`follower`, `following`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Follows` ADD CONSTRAINT `Follows_follower_fkey` FOREIGN KEY (`follower`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follows` ADD CONSTRAINT `Follows_following_fkey` FOREIGN KEY (`following`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
