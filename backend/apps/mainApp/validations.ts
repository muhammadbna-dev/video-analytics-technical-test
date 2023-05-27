import { z } from "zod";

const buildZodErrorMessage = (issues: { message: string }[]): string => {
  let errorMessagesArray: Array<string> = [];
  issues.forEach((issue: { message: string }) => {
    errorMessagesArray.push(issue.message || "");
  });

  return errorMessagesArray.join("\n");
};

const VideoMetadata = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    .trim()
    .min(1, { message: "Title minimum length is 1 character." })
    .max(100, { message: "Title maximum length is 100 characters." }),
  startDatetime: z
    .string({
      required_error: "Start datetime is required.",
    })
    .trim()
    .datetime({
      message: "Datetime has to be in the ISOstring format.",
    }),
  postalCode: z.union([
    z
      .string()
      .trim()
      .length(6, { message: "Postal code has to be exactly 6 digits" })
      .regex(/^\d+$/, { message: "Postal code has to be all digits" }),
    z.literal(""),
  ]),
});

const validateStartDate = (startDate: Date): void => {
  const schema = z.coerce.date().max(new Date(Date.now() + 3600 * 1000 * 24), {
    message: "Video start date cannot be later than today",
  });
  schema.parse(startDate);
};

type IVideoMetadata = z.infer<typeof VideoMetadata>;

enum VideoMimeTypes {
  mp4 = "video/mp4",
}

const Video = z.object({
  mimetype: z.nativeEnum(VideoMimeTypes, {
    errorMap: () => ({
      message: "Only mp4 video types are supported for upload.",
    }),
  }),
  size: z
    .number({
      required_error: "Invalid file uploaded. Size not found.",
    })
    .lte(5242880, {
      message: "Only file sizes less than or equal to 5MB is allowed.",
    })
    .positive({ message: "Invalid file uploaded. Size is negative" }),
});

export {
  buildZodErrorMessage,
  VideoMetadata,
  IVideoMetadata,
  Video,
  validateStartDate,
};
