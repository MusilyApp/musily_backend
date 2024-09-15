/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpResponse<T> = {
  data: T;
  status: number;
  headers: Record<string, any>;
};
export interface IHttpAdapter {
  get<T>(url: string, params?: Record<string, any>): Promise<HttpResponse<T>>;
  post<T>(url: string, data?: Record<string, any>): Promise<HttpResponse<T>>;
  put<T>(url: string, data?: Record<string, any>): Promise<HttpResponse<T>>;
  delete<T>(url: string): Promise<HttpResponse<T>>;
}
