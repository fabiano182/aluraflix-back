import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryEntity } from './categories.entity';
import { CategoriesService } from './categories.service';
import { createCategoryDTO } from './dto/createCategoryDTO';
import { updateCategoryDTO } from './dto/updateCategoryDTO';

@Controller('categorias')
export class CategoriesController {
    constructor (private readonly categoriesService: CategoriesService) {}

    @Get()
    public async findAll(): Promise<CategoryEntity[]> {
        return await this.categoriesService.getCategories();
    }

    @Get(':id')
    public async findOne(@Param('id') id: number): Promise<CategoryEntity> {
        return await this.categoriesService.getCategory(id);
    }

    @Get(':id/videos')
    public async findVideos(@Param('id') id: number): Promise<CategoryEntity> {
        return await this.categoriesService.getVideosByCategory(id);
    }

    @Post()
    public async create(@Body() category: createCategoryDTO): Promise<CategoryEntity> {
        return await this.categoriesService.createCategory(category);
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() category: updateCategoryDTO): Promise<CategoryEntity> {
        return await this.categoriesService.updateCategory(id, category);
    }

    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<{ message: string }> {
        return await this.categoriesService.deleteCategory(id);
    }
}
