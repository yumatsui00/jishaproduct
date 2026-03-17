export type ResultErrorCode =
  | "VALIDATION_ERROR"
  | "DUPLICATE_NAME"
  | "NOT_FOUND"
  | "IO_ERROR"
  | "UNKNOWN_ERROR";

export interface ResultError {
  code: ResultErrorCode;
  message: string;
}

export interface ResultSuccess<T> {
  ok: true;
  data: T;
}

export interface ResultFailure {
  ok: false;
  error: ResultError;
}

export type Result<T> = ResultSuccess<T> | ResultFailure;
