export enum HealthStatus {
  AVAILABLE = 'En linea',
  UNAVAILABLE = 'Fuera de línea',
}

export type Health = {
  status: HealthStatus;
};
