-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(150) NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "postalCode" VARCHAR(10) NOT NULL,
    "fileName" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_path_key" ON "Video"("path");
