import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import VideoEntity from 'src/videos/video.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from './categories.entity';
import { createCategoryDTO } from './dto/createCategoryDTO';
import { updateCategoryDTO } from './dto/updateCategoryDTO';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,

        @InjectRepository(VideoEntity)
        private readonly videosRepository: Repository<VideoEntity>,
    ) { }

    async getCategories(): Promise<CategoryEntity[]> {
        return this.categoryRepository.find();
    }

    async getCategory(id: number): Promise<CategoryEntity> {
        return this.categoryRepository.findOneBy({ id });
    }

    async getVideosByCategory(id: number): Promise<any> {
        const videos = await this.videosRepository.createQueryBuilder('videos')
            .innerJoinAndSelect('videos.categoryId', 'categories')
            .where('categories.id = :id', { id })
            .select(['videos.id', 'videos.title', 'videos.description', 'videos.url', 'categories.id'])
            .getMany();

        videos.forEach(video => {
            video.categoryId = video.categoryId['id'];
        });

        return videos;
    }

    async createCategory(category: createCategoryDTO): Promise<CategoryEntity> {
        return this.categoryRepository.save(category);
    }

    async updateCategory(id: number, category: updateCategoryDTO): Promise<CategoryEntity> {
        const categoryToUpdate = await this.categoryRepository.findOneBy({ id });

        if (category.title) {
            categoryToUpdate.title = category.title;
        }
        if (category.color) {
            categoryToUpdate.color = category.color;
        }

        return this.categoryRepository.save(categoryToUpdate);
    }

    async deleteCategory(id: number): Promise<{ message: string }> {
        const deleteResult = await this.categoryRepository.delete(id);

        if (deleteResult.affected > 0) {
            return { message: 'Categoria deletada' };
        }

        return { message: 'Categoria não encontrada' };
    }

}