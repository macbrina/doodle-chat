export type ApiResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      status: number;
      error: ErrorResponse;
    };

interface ErrorResponseDetail {
  msg: string;
  param: string;
  location: string;
}

export interface ErrorResponse {
  error: string;
  details: ErrorResponseDetail[];
}

interface InternalError {
  message: string;
  createdAt: string;
}

export interface InternalServerError {
  error: InternalError;
}
