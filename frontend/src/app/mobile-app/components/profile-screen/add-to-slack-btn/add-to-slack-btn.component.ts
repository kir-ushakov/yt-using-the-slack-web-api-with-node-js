import { Component } from '@angular/core';

@Component({
  selector: 'app-add-to-slack-btn',
  templateUrl: './add-to-slack-btn.component.html',
  styleUrls: ['./add-to-slack-btn.component.scss'],
})
export class AddToSlackBtnComponent {
  readonly INSTALL_PATH = 'https://slack.com/oauth/v2/authorize';

  readonly SCOPES = [
    'chat:write',
    'channels:read',
    'groups:read',
    'mpim:read',
    'im:read',
    'channels:manage',
    'groups:write',
    'im:write',
    'mpim:write',
    'channels:join',
  ];

  readonly REDIRECT_URI = 'https://brainas.net/integrations/slack/install';

  readonly CLIENT_ID = '4302912159520.6331710262610';

  get scopes() {
    return this.SCOPES.toString();
  }

  get installURI() {
    return `${this.INSTALL_PATH}?scope=${this.scopes}&redirect_uri=${this.REDIRECT_URI}&client_id=${this.CLIENT_ID}`;
  }
}
