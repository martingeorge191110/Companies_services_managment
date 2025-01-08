-- CreateTable
CREATE TABLE `Companies` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `registration_number` VARCHAR(191) NULL,
    `business_type` ENUM('Accounting', 'Finance', 'Retail', 'Manufacturing', 'Healthcare', 'Technology', 'Education', 'Hospitality', 'Transportation') NOT NULL,
    `specialize` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `fiscal_year` VARCHAR(191) NOT NULL,
    `started_date` DATETIME(3) NOT NULL,
    `active_permission` BOOLEAN NOT NULL DEFAULT false,
    `valid_account` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Companies_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `f_n` VARCHAR(191) NOT NULL,
    `l_n` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `con_pass` VARCHAR(191) NOT NULL,
    `last_login` DATETIME(3) NOT NULL,
    `manager` BOOLEAN NOT NULL DEFAULT false,
    `department` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,
    `salary` DOUBLE NULL,
    `company_agent_id` VARCHAR(191) NULL,
    `company_employee_id` VARCHAR(191) NULL,
    `active_account` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_company_agent_id_fkey` FOREIGN KEY (`company_agent_id`) REFERENCES `Companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_company_employee_id_fkey` FOREIGN KEY (`company_employee_id`) REFERENCES `Companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
