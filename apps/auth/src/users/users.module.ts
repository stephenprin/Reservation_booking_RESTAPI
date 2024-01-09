import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { UsersDocument, UsersSchema } from './model/users.schema';
import { UserController } from './users.controller';
import { UsesRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UsersDocument.name, schema: UsersSchema },
    ]),
  ],
  controllers: [UserController],

  providers: [UsersService, UsesRepository],
  exports: [UsersService],
})
export class UsersModule {}
