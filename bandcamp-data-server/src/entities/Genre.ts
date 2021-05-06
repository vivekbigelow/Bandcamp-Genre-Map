import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Album } from "./Album";


@ObjectType()
@Entity()
export class Genre extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @Field(() => [Album])
  @ManyToMany(()=> Album, album => album.genres)
  albums: Album[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date

  @Field(()=> String)
  @UpdateDateColumn()
  updatedAt = Date

}