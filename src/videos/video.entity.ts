import { CategoryEntity } from 'src/categories/categories.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity("videos")
export default class VideoEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar')
    public title: string;

    @Column('varchar')
    public description: string;

    @Column('varchar')
    public url: string;

    // Relacionamento entre video e categoria (1:1) categoryId  -> id
    @OneToOne(() => CategoryEntity)
    @JoinColumn({ name: 'categoryId' })
    public categoryId: CategoryEntity['id'];

}