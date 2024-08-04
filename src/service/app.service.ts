import { Health, HealthStatus } from '@/types/health.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAvailability(): Health {
    return { status: HealthStatus.AVAILABLE };
  }

  checkEmail(status: boolean): { ok: boolean } {
    return { ok: status };
  }
}
