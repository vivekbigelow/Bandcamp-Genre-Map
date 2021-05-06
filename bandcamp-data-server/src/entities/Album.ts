
import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Artist } from "./Artist";
import { City } from "./City";
import { Country } from "./Country";
import { Location } from "./Location";
import { Genre } from "./Genre";
import { ReleaseDate } from "./ReleaseDate";
import { Title } from "./Title";


@ObjectType()
@Entity()
export class Album extends BaseEntity {

  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id!:number;

  @Field()
  @ManyToOne(()=> Title, title => title.albums)
  title!: Title;


  @Field(()=> Artist)
  @ManyToOne(()=> Artist, artist => artist.albums)
  artist: Artist;

  @Field(()=>ReleaseDate)
  @ManyToOne(()=>ReleaseDate, releaseDate => releaseDate.albums)
  releaseDate: ReleaseDate;
  
  @Field(()=>City)
  @ManyToOne(()=>City, city => city.albums)
  city: City;

  @Field(()=>Country)
  @ManyToOne(()=>Country, country => country.albums)
  country: Country;

  @Field(()=>Location)
  @ManyToOne(()=>Location, location => location.albums)
  location: Location;

  @Field(()=> String)
  @Column()
  url: string;

  @Field(()=>Int)
  @Column()
  numberTracks: number;
 
  @Field( () => [Genre])
  @ManyToMany(() => Genre, genre => genre.albums)
  @JoinTable()
    genres : Genre[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date

  @Field(()=> String)
  @UpdateDateColumn()
  updatedAt = Date

}