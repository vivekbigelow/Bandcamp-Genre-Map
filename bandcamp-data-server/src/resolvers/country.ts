import { Resolver, Query, Arg } from 'type-graphql';
import { Country } from '../entities/Country';

@Resolver()
export class CountryResolver {
    @Query(()=> [Country])
    countries(): Promise<Country[]> {
        return Country.find();
    }

    @Query(()=>Country, { nullable: true })
    country(
        @Arg('name') name:string
    ):Promise<Country | undefined>{
        return Country.findOne({where: name = name})
    }
    
}