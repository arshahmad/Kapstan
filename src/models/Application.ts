export interface Application {
    id: number;
    name: string;
    status: string;
    version: string | null;
    updatedAt: string;
    desiredVersion: string;
  }