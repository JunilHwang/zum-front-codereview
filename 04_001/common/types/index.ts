export interface PostData {
  id: number | null;
  subject: string | null;
  author: string | null;
  createdDate: Date | null;
  contents: string | null;
}

// ---------

export interface ResponseDataType<T = any> {
  statusCode: number;
  message: string;
  data: T | null;
}