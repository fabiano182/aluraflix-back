import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import Video from './video.entity';
import { VideosService } from './videos.service';
import { createVideoDTO } from './dto/createVideoDTO';
import { updateVideoDTO } from './dto/updateVideoDTO';

@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) { }

    @Get()
    getVideos(): Promise<Video[]> {
        return this.videosService.getVideos();
    }

    @Get(':id')
    getVideo(@Param('id') id: number): Promise<Video> {
        return this.videosService.getVideo(id);
    }

    @Post()
    createVideo(@Body() video: createVideoDTO): Promise<Video> {
        return this.videosService.createVideo(video);
    }

    @Put(':id')
    updateVideo(@Param('id') id: number, @Body() video: updateVideoDTO): Promise<Video> {
        return this.videosService.updateVideo(id, video);
    }

    @Delete(':id')
    deleteVideo(@Param('id') id: number): Promise<{ message: string }> {
        return this.videosService.deleteVideo(id);
    }
}
