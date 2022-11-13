import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("categories")
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar')
    public title: string;

    @Column('varchar')
    public color: string;
}