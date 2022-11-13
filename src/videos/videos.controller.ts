import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import VideoEntity from './video.entity';
import { VideosService } from './videos.service';
import { createVideoDTO } from './dto/createVideoDTO';
import { updateVideoDTO } from './dto/updateVideoDTO';

@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) { }

    @Get()
    getVideos(): Promise<VideoEntity[]> {
        return this.videosService.getVideos();
    }

    @Get(':id')
    getVideo(@Param('id') id: number): Promise<VideoEntity> {
        return this.videosService.getVideo(id);
    }

    @Post()
    createVideo(@Body() video: createVideoDTO): Promise<VideoEntity> {
        return this.videosService.createVideo(video);
    }

    @Put(':id')
    updateVideo(@Param('id') id: number, @Body() video: updateVideoDTO): Promise<VideoEntity> {
        return this.videosService.updateVideo(id, video);
    }

    @Delete(':id')
    deleteVideo(@Param('id') id: number): Promise<{ message: string }> {
        return this.videosService.deleteVideo(id);
    }
}
