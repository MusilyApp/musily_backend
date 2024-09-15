/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { HttpResponse, IHttpAdapter } from '../domain/adapters/http.adapter';

export class HttpAdapter implements IHttpAdapter {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  async get<T>(
    url: string,
    params?: Record<string, any>,
  ): Promise<HttpResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
      params,
    });
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  }

  async post<T>(
    url: string,
    data?: Record<string, any>,
  ): Promise<HttpResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  }

  async put<T>(
    url: string,
    data?: Record<string, any>,
  ): Promise<HttpResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  }

  async delete<T>(url: string): Promise<HttpResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  }
}
