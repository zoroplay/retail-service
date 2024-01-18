-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('APPROVED', 'PENDING');

-- CreateTable
CREATE TABLE "CashIn" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "shop_id" TEXT,
    "branch_id" TEXT NOT NULL,
    "approved_by" TEXT,
    "amount" INTEGER,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "comment" TEXT,
    "user_id" TEXT,
    "approved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashIn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashOut" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "shop_id" TEXT,
    "branch_id" TEXT,
    "approved_by" TEXT,
    "amount" INTEGER,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "comment" TEXT,
    "user_id" TEXT,
    "approved_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashOut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deduction" (
    "id" TEXT NOT NULL,
    "year" INTEGER,
    "month" TIMESTAMP(3),
    "branch_id" TEXT,
    "description" TEXT,
    "amount" INTEGER,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "expense_type_id" TEXT NOT NULL,
    "branch_id" TEXT,
    "user_id" TEXT,
    "approved_by" TEXT,
    "approved_at" TIMESTAMP(3),
    "amount" INTEGER,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseType" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "amount" INTEGER,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fixed" INTEGER,
    "category_id" TEXT,

    CONSTRAINT "ExpenseType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_expense_type_id_fkey" FOREIGN KEY ("expense_type_id") REFERENCES "ExpenseType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseType" ADD CONSTRAINT "ExpenseType_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ExpenseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
