import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createVideoDTO } from './dto/createVideoDTO';
import { listVideoDTO } from './dto/listVideoDTO';
import { updateVideoDTO } from './dto/updateVideoDTO';
import VideoEntity from './video.entity';

@Injectable()
export class VideosService {

    constructor(
        @InjectRepository(VideoEntity)
        private readonly videosRepository: Repository<VideoEntity>,
    ) { }

    async getVideos(): Promise<listVideoDTO[]> {
        const videos = await this.videosRepository.createQueryBuilder('videos')
            .innerJoinAndSelect('videos.categoryId', 'categories')
            .select(['videos.id', 'videos.title', 'videos.description', 'videos.url', 'categories.id'])
            .getMany();

        videos.forEach(video => {
            video.categoryId = video.categoryId['id'];
        });

        return videos;
    }

    async getVideo(id: number): Promise<VideoEntity> {
        return this.videosRepository.findOneBy({ id });
    }

    async createVideo(video: createVideoDTO): Promise<VideoEntity> {
        const newVideo = this.videosRepository.create(video);
        if (video.categoryId == null) {
            newVideo.categoryId = 1;
        }
        return this.videosRepository.save(video);
    }

    async updateVideo(id: number, video: updateVideoDTO): Promise<VideoEntity> {
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

    async deleteVideo(id: number): Promise<{ message: string }> {
        const deleteResult = await this.videosRepository.delete(id)

        if (deleteResult.affected > 0) {
            return { message: 'Video deletado' };
        }

        return { message: 'Video não encontrado' };
    }

}