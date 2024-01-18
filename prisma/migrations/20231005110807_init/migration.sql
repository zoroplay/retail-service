/*
  Warnings:

  - You are about to drop the column `shop_id` on the `CashIn` table. All the data in the column will be lost.
  - You are about to drop the column `shop_id` on the `CashOut` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "TransactionStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "CashIn" DROP COLUMN "shop_id",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CashOut" DROP COLUMN "shop_id",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
