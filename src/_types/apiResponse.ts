// api response attributes
interface ApiResponse<T> {
  status: number;
  data: T | null;
  message?: string;
}

export type { ApiResponse };
