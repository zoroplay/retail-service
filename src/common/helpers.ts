/* eslint-disable prettier/prettier */
export const slugify = (text: string) => {
  if (!text) return null;
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
export interface SuccessResponse {
  success: true;
  message: string;
  data: any;
  status: number;
}
export interface ErrorResponse {
  success: false;
  message: string;
  errors: any | null;
  status: number;
}
export type SuccessResponseFn = (
  data: any,
  message: string,
  status: number,
) => SuccessResponse;
export type ErrorResponseFn = (
  message: string,
  errors: any | null,
  status: number,
) => ErrorResponse;

export const handleResponse: SuccessResponseFn = (data, message, status) => {
  return {
    success: true,
    message,
    data,
    status,
  };
};

export const handleError: ErrorResponseFn = (message, errors, status) => {
  return {
    success: false,
    message,
    errors,
    status,
  };
};
