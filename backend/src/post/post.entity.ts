import { CategoryEntity } from 'src/category/entities/category.entity';
import { TagEntity } from 'src/tags/entities/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({})
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  content: string;

  @ManyToOne(() => CategoryEntity, (category) => category.posts)
  @JoinColumn()
  category: CategoryEntity;

  @OneToMany(() => TagEntity, (tag) => tag.post)
  @JoinColumn()
  tags: TagEntity[];
}
