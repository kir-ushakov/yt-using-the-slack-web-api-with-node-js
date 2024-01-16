import { UseCase } from '../../../../../shared/core/UseCase';
import { CreateTaskRequestDTO } from './create-task.dto';
import { Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/app-error';
import { ITaskProps, Task } from '../../../../../shared/domain/models/task';
import { TaskRepo } from '../../../../../shared/repo/task.repo';
import { DomainError } from '../../../../../shared/core/domain-error';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { CreateTaskErrors } from './create-task.errors';
import { UseCaseError } from '../../../../../shared/core/use-case-error';
import { SlackService } from '../../../../../shared/infra/integrations/slack/slack.service';

export class CreateTaskUC
  implements UseCase<CreateTaskRequestDTO, Promise<Result<any>>>
{
  private _taskRepo: TaskRepo;
  private _slackService: SlackService;

  constructor(taskRepo: TaskRepo, slackService: SlackService) {
    this._taskRepo = taskRepo;
    this._slackService = slackService;
  }

  public async execute(
    dto: CreateTaskRequestDTO
  ): Promise<Result<Task | UseCaseError>> {
    const taskProps: ITaskProps = {
      userId: dto.userId,
      type: dto.type,
      title: dto.title,
      status: dto.status,
      createdAt: new Date(),
      modifiedAt: new Date(),
    };

    const taskOrError: Result<Task | DomainError> = await Task.create(
      taskProps,
      new UniqueEntityID(dto.id)
    );

    if (taskOrError.isFailure) {
      return new CreateTaskErrors.TaskDataInvalid(
        taskOrError.error as DomainError
      );
    }

    const task: Task = taskOrError.getValue() as Task;

    await this._taskRepo.create(task);

    this._slackService.sendMessage(
      `New task created: '${taskProps.title}'`,
      taskProps.userId
    );

    return Result.ok(task);
  }
}
