//import {Entity, PrimaryKey, PrimaryKeyType, Property} from "@mikro-orm/core"

import { ObjectType, Field, Int, Float } from "type-graphql";
import { CreateDateColumn, BaseEntity, Entity, UpdateDateColumn, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm";
import { Album } from './Album'


@ObjectType()
@Entity()
export class Location extends BaseEntity{
    @Field(()=> Int)
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field(() => Float)
    @Column({type: "float"})
    lat!: number;

    @Field(() => Float )
    @Column({type: "float"})
    lng!: number;

    @OneToMany(() => Album, album => album.location)
    albums : Album[]

    @Field(() => String)
    @CreateDateColumn()
    createdAt = Date

    @Field(()=> String)
    @UpdateDateColumn()
    updatedAt = Date

}