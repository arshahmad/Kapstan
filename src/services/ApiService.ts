import axios, { AxiosResponse } from "axios";
import { Application } from "../models/Application";
import { CPUUtilization } from "../models/CPUUtilization";
import { MemoryUtilization } from "../models/MemoryUtilization";
import { EventHistory } from "../models/EventHistory";

class APIService {
  private baseURL: string;

  static getInstance(): APIService {
    return new APIService();
  }

  constructor() {
    this.baseURL = "https://retoolapi.dev";
  }

  public async getApplications(): Promise<Application[]> {
    try {
      const response: AxiosResponse<Application[]> = await axios.get<
        Application[]
      >(`${this.baseURL}/71NNjB/applications`);
      return response.data;
    } catch (error) {
      console.error("Error fetching applications:", error);
      return [];
    }
  }

  public async getMemoryUtilization(): Promise<MemoryUtilization[]> {
    try {
      const response: AxiosResponse<MemoryUtilization[]> = await axios.get<
        MemoryUtilization[]
      >(`${this.baseURL}/ybFVVH/memoryutilization`);
      return response.data;
    } catch (error) {
      console.error("Error fetching memory utilization:", error);
      return [];
    }
  }

  public async getCPUUtilization(): Promise<CPUUtilization[]> {
    try {
      const response: AxiosResponse<CPUUtilization[]> = await axios.get<
        CPUUtilization[]
      >(`${this.baseURL}/Ymxfa2/cpuutilization`);
      return response.data;
    } catch (error) {
      console.error("Error fetching CPU utilization:", error);
      return [];
    }
  }

  public async getEventHistory(): Promise<EventHistory[]> {
    try {
      const response: AxiosResponse<EventHistory[]> = await axios.get<
        EventHistory[]
      >(`${this.baseURL}/TYjDIe/eventhistory`);
      return response.data;
    } catch (error) {
      console.error("Error fetching event history:", error);
      return [];
    }
  }
}

export const apiService = APIService.getInstance();
