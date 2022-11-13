import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import VideoEntity from './video.entity';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule {}
