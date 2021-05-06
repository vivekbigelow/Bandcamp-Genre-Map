import { Resolver, Query } from 'type-graphql';
import { Location } from "../entities/Location"

@Resolver()
export class LocationResolver {
    @Query(()=> [Location])
    locations(): Promise<Location[]> {
        return Location.find()
    }

    
}