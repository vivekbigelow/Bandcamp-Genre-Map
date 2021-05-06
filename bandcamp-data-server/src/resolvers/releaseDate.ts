import { Resolver, Query, Arg } from 'type-graphql';
import { ReleaseDate } from '../entities/ReleaseDate';

@Resolver()
export class ReleaseDateResolver {
    @Query(()=> [ReleaseDate])
    dates(): Promise<ReleaseDate[]> {
        return ReleaseDate.find();
    }

    @Query(()=>ReleaseDate, { nullable: true })
    date(
        @Arg('date') date:string
    ):Promise<ReleaseDate | undefined>{
        return ReleaseDate.findOne({where: date = date})
    }
    
}