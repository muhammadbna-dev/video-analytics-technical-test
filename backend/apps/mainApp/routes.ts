import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Router, Request } from "express";
import multer, { Multer } from "multer";
import { PrismaClient, Video } from "@prisma/client";

import Controller from "./controller";

const videoUpload: Multer = multer({
  storage: multer.diskStorage({
    destination: function (
      _req: Request,
      _file: Express.Multer.File,
      cb: Function
    ): void {
      cb(null, "uploaded_videos");
    },
    filename: function (
      req: Request,
      file: Express.Multer.File,
      cb: Function
    ): void {
      const fileName: string =
        crypto.randomUUID().toString() + path.extname(file.originalname);
      cb(null, fileName);

      req.on("finish", async (): Promise<void> => {
        const prisma: PrismaClient = new PrismaClient();
        const video: Video | null = await prisma.video.findUnique({
          where: {
            fileName: fileName,
          },
        });
        if (!video) {
          const fullFilePath: string = path.join("uploaded_videos", fileName);
          file.stream.on("end", () => {
            fs.unlink(fullFilePath, (err: NodeJS.ErrnoException | null) => {
              if (err) {
                console.error(err);
              }
            });
          });
          file.stream.emit("end");
        }
      });
    },
  }),
});

const router: Router = Router();

router.post(
  "/upload-video",
  videoUpload.single("video"),
  Controller.uploadVideo
);

export default router;
