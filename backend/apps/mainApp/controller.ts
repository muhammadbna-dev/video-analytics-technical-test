import { Request, Response } from "express";
import { ZodError } from "zod";
import { PrismaClient } from "@prisma/client";

import { sanitizeValue } from "./sanitization_utils";
import {
  VideoMetadata,
  IVideoMetadata,
  Video,
  validateStartDate,
} from "./validations";
import { sendZodErrorResponse, sendResponse } from "./api_utils";

const uploadVideo = async (req: Request, res: Response): Promise<Response> => {
  let {
    title = "",
    startDatetime = "",
    postalCode = "",
  }: IVideoMetadata = req.body;

  try {
    VideoMetadata.parse({
      title,
      startDatetime,
      postalCode,
    });
    validateStartDate(new Date(startDatetime));
  } catch (err: ZodError | unknown) {
    return sendZodErrorResponse(err, res);
  }

  title = sanitizeValue(title);
  startDatetime = sanitizeValue(startDatetime);
  postalCode = sanitizeValue(postalCode);

  const video: Express.Multer.File | undefined = req.file;
  if (!video) {
    return sendResponse(res, false, "No video uploaded", {});
  }

  try {
    Video.parse(video);
  } catch (err: ZodError | unknown) {
    return sendZodErrorResponse(err, res);
  }

  const prisma: PrismaClient = new PrismaClient();
  await prisma.video.create({
    data: {
      title,
      startDateTime: startDatetime,
      postalCode,
      fileName: video.filename,
    },
  });

  return sendResponse(
    res,
    true,
    `Success! File saved as ${video.filename}`,
    {}
  );
};

export default {
  uploadVideo,
};
