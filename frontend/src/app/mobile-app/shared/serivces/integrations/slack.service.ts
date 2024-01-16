import { Injectable } from '@angular/core';
import { HTTP_METHODS, RestService } from '../infrastructure/rest.service';
import { API_ENDPOINTS } from '../../constants/api-endpoints.const';

@Injectable({
  providedIn: 'root',
})
export class SlackService {
  constructor(private _restService: RestService) {}
  async addToSlack(code: string): Promise<void> {
    const endpoint = `${API_ENDPOINTS.INTEGRATIONS.SLACK}`;
    const payload = { code };
    await this._restService
      .makeRequest(HTTP_METHODS.POST, endpoint, payload)
      .toPromise();
  }

  async removeFromSlack(): Promise<void> {
    const endpoint = `${API_ENDPOINTS.INTEGRATIONS.SLACK}`;
    await this._restService
      .makeRequest(HTTP_METHODS.DELETE, endpoint)
      .toPromise();
  }
}
