import { Response } from "express";
import { ZodError } from "zod";

import { buildZodErrorMessage } from "./validations";

interface IResponseData {
  success: boolean;
  message: string;
  data: object;
}

const sendZodErrorResponse = (err: ZodError | any, res: Response): Response => {
  let errorMessage: string = "";
  errorMessage = buildZodErrorMessage(err.issues || []);
  if (!errorMessage) {
    console.error(err);
  }
  return sendResponse(res, false, errorMessage, {});
};

const sendResponse = (
  res: Response,
  success: boolean,
  message: string,
  data: Object
): Response => {
  const responseData: IResponseData = {
    success,
    message,
    data,
  };
  return res.send(responseData);
};

export { sendZodErrorResponse, sendResponse };
