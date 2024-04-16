import { Injectable } from '@nestjs/common';
import { HttpService } from '@src/shared/services/http.service';

const FB_PIXEL_ENDPOINT = `https://graph.facebook.com/v19.0/${process.env.FB_DATASET_ID}/events?access_token=${process.env.FB_PIXEL_TOKEN}`;

@Injectable()
export class FbPixelService {
  httpService: HttpService;
  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  sendEvent(eventData: EventData): Promise<any> {
    return this.httpService.post<void>(FB_PIXEL_ENDPOINT, eventData);
  }
}

interface EventData {
  data: PixelData[];
}

interface PixelData {
  action_source: string;
  event_id: number;
  event_name: string;
  event_time: number;
  user_data?: {
    client_ip_address: string;
    client_user_agetn: string;
    em: string;
  };
  event_source_path: string;
  client_user_agent: string;
  client_ip_address: string;
}
