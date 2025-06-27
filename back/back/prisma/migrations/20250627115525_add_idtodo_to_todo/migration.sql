/*
  Warnings:

  - A unique constraint covering the columns `[userId,idTodo]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idTodo` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "idTodo" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_userId_idTodo_key" ON "Todo"("userId", "idTodo");
