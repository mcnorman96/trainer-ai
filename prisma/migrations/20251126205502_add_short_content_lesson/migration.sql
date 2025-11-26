-- AlterTable
ALTER TABLE `Lesson` ADD COLUMN `shortContent` VARCHAR(191) NULL,
    MODIFY `content` TEXT NULL;
