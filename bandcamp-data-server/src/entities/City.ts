//import {Entity, PrimaryKey, PrimaryKeyType, Property} from "@mikro-orm/core"

import { ObjectType, Field, Int } from "type-graphql";
import { CreateDateColumn, BaseEntity, Entity, UpdateDateColumn, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm";
import { Album } from './Album'


@ObjectType()
@Entity()
export class City extends BaseEntity{
    @Field(()=> Int)
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field(()=> String)
    @Column({unique: true})
    name!: string;

    @OneToMany(() => Album, album => album.city)
    albums: Album[]

    @Field(() => String)
    @CreateDateColumn()
    createdAt = Date

    @Field(()=> String)
    @UpdateDateColumn()
    updatedAt = Date

}