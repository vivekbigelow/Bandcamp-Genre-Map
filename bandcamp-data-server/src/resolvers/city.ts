import { Resolver, Query, Arg } from 'type-graphql';
import { City } from '../entities/City';

@Resolver()
export class CityResolver {
    @Query(()=> [City])
    cities(): Promise<City[]> {
        return City.find();
    }

    @Query(()=>City, { nullable: true })
    city(
        @Arg('name') name:string
    ):Promise<City | undefined>{
        return City.findOne({where: name = name})
    }
    
}