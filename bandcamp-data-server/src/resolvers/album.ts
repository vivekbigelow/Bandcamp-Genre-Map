import { Resolver, Query } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Album } from '../entities/Album';

@Resolver()
export class AlbumResolver {
    @Query(()=> [Album])
    async albums(): Promise<Album []> {
        const albums = await getConnection()
        .getRepository(Album)
        .createQueryBuilder("a")
        .leftJoinAndSelect("a.genres", "genre")
        .leftJoinAndSelect("a.title", "title")
        .leftJoinAndSelect("a.artist", "artist")
        .leftJoinAndSelect("a.releaseDate", "releaseDate")
        .leftJoinAndSelect("a.city", "city")
        .leftJoinAndSelect("a.country", "country")
        .leftJoinAndSelect("a.location","location")
        .getMany()

        return albums
    }
    
}