import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Video {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar')
    public title: string;

    @Column('varchar')
    public description: string;

    @Column('varchar')
    public url: string;

}

export default Video;