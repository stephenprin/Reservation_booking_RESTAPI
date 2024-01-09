import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UsersDocument } from './users/model/users.schema';

const getCurrentUserByContext = (context: ExecutionContext): UsersDocument => {
  const request = context.switchToHttp().getRequest();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
