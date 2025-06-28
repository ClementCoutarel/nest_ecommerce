import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentUserByContext = (context: ExecutionContext) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => getCurrentUserByContext(context));