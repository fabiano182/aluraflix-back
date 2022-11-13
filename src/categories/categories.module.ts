import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import VideoEntity from 'src/videos/video.entity';
import { CategoriesController } from './categories.controller';
import { CategoryEntity } from './categories.entity';
import { CategoriesService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, VideoEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
