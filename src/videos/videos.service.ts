import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createVideoDTO } from './dto/createVideoDTO';
import { updateVideoDTO } from './dto/updateVideoDTO';
import Video from './video.entity';

@Injectable()
export class VideosService {

    constructor(
        @InjectRepository(Video)
        private readonly videosRepository: Repository<Video>,
    ) { }

    async getVideos(): Promise<Video[]> {
        return this.videosRepository.find();
    }

    async getVideo(id: number): Promise<Video> {
        return this.videosRepository.findOneBy({ id });
    }

    async createVideo(video: createVideoDTO): Promise<Video> {
        return this.videosRepository.save(video);
    }

    async updateVideo(id: number, video: updateVideoDTO): Promise<Video> {
        const videoToUpdate = await this.videosRepository.findOneBy({ id });

        if (video.title) {
            videoToUpdate.title = video.title;
        }
        if (video.description) {
            videoToUpdate.description = video.description;
        }
        if (video.url) {
            videoToUpdate.url = video.url;
        }

        return this.videosRepository.save(videoToUpdate);
    }

    async deleteVideo( id: number): Promise<{ message: string }> {
        const deleteResult = await this.videosRepository.delete(id)

        if (deleteResult.affected > 0) {
            return { message: 'Video deletado' };
        }

        return { message: 'Video não encontrado' };
    }

}