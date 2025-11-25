-- AlterTable
ALTER TABLE `Lesson` ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Module` ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false;
