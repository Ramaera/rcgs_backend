-- CreateTable
CREATE TABLE "BATCH" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "batchCode" TEXT NOT NULL,

    CONSTRAINT "BATCH_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardCode" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "batchCodeId" TEXT NOT NULL,

    CONSTRAINT "RewardCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BATCH_batchCode_key" ON "BATCH"("batchCode");

-- CreateIndex
CREATE UNIQUE INDEX "RewardCode_code_key" ON "RewardCode"("code");

-- AddForeignKey
ALTER TABLE "RewardCode" ADD CONSTRAINT "RewardCode_batchCodeId_fkey" FOREIGN KEY ("batchCodeId") REFERENCES "BATCH"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
