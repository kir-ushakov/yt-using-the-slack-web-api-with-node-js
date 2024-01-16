import { WebClient } from '@slack/web-api';
import { AddToSlackController } from './add-to-slack.controller';
import { AddToSlackUsecase } from './add-to-slack.usecase';
import { models } from '../../../../../shared/infra/database/mongodb/index';
import { SlackOAuthAccessRepo } from '../../../../../shared/repo/slack-oauth-access.repo';

const webClient = new WebClient();
const slackOAuthAccessRepo = new SlackOAuthAccessRepo(models);
const addToSlackUsecase = new AddToSlackUsecase(
  webClient,
  slackOAuthAccessRepo
);

const addToSlackController = new AddToSlackController(addToSlackUsecase);

export { addToSlackController };
