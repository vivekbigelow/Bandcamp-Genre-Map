import { Resolver, Query, Arg } from 'type-graphql';
import { getConnection } from 'typeorm';
import {Genre} from '../entities/Genre';

@Resolver()
export class GenreResolver {
    @Query(()=> [Genre])
    async genres(): Promise<Genre []> {
        const genres = await getConnection()
            .getRepository(Genre)
            .createQueryBuilder("g")
            .leftJoinAndSelect("g.albums","album")
            .leftJoinAndSelect("album.city", "city")
            .leftJoinAndSelect("album.country","country")
            .leftJoinAndSelect("album.releaseDate","releaseDate")
            .leftJoinAndSelect("album.title", "title")
            .leftJoinAndSelect("album.artist", "artist")
            .orderBy("g.name", 'ASC')
            .getMany()
        return genres
    }

    @Query( ()=> Genre, {nullable: true})
    genre(@Arg('id') id: number): Promise<Genre | undefined> {
        return Genre.findOne(id);
    }

    @Query(()=>Genre, {nullable: true})
    async genreByName(@Arg('name', () => String) name: string): Promise<Genre | undefined> {
        const genre = await getConnection()
            .getRepository(Genre)
            .createQueryBuilder("g")
            .where("g.name = :name", {name:name})
            .leftJoinAndSelect("g.albums","album")
            .leftJoinAndSelect("album.city", "city")
            .leftJoinAndSelect("album.country","country")
            .leftJoinAndSelect("album.releaseDate","releaseDate")
            .leftJoinAndSelect("album.title", "title")
            .leftJoinAndSelect("album.artist", "artist")
            .leftJoinAndSelect("album.location", "location")
            .getOne()
        return genre
            
    }

    
    

}