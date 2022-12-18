import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto'
import { CreateNotificationBody } from './create-notification-body';

@Controller('test')
export class AppController {
  constructor(private readonly prismaService: PrismaService) { }

  @Get()
  list() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    console.log(body);
    const { recipientId, content, category } = body;
    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        recipientId: recipientId,
        content: content,
        category: category
      }
    });
  }
}
