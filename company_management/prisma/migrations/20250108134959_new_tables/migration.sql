-- CreateTable
CREATE TABLE `Investors` (
    `id` VARCHAR(191) NOT NULL,
    `f_n` VARCHAR(191) NOT NULL,
    `l_n` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `con_pass` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NULL,
    `investment_focus` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `funding_amount` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Investors_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Investors_Companies` (
    `investor_id` VARCHAR(191) NOT NULL,
    `company_id` VARCHAR(191) NOT NULL,
    `started_date` DATETIME(3) NOT NULL,
    `investing_amount` DOUBLE NOT NULL,
    `investment_type` ENUM('Equity', 'Debt', 'ConvertibleDebt') NOT NULL,
    `investor_percentage` DOUBLE NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `investor_company_ids`(`investor_id`, `company_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Investors_Companies` ADD CONSTRAINT `Investors_Companies_investor_id_fkey` FOREIGN KEY (`investor_id`) REFERENCES `Investors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investors_Companies` ADD CONSTRAINT `Investors_Companies_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
