import { Resolver, Query, Arg } from 'type-graphql';
import { Artist } from '../entities/Artist';

@Resolver()
export class ArtistResolver {
    @Query(()=> [Artist])
    artists(): Promise<Artist[]> {
        return Artist.find();
    }

    @Query(()=>Artist, { nullable: true })
    artist(
        @Arg('name') name:string
    ):Promise<Artist | undefined>{
        return Artist.findOne({where: name = name})
    }
    
}