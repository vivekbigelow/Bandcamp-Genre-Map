import { Resolver, Query, Arg } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Title } from '../entities/Title';

@Resolver()
export class TitleResolver {
    @Query(()=> [Title])
    titles(): Promise<Title[]> {
        return Title.find();
    }

    @Query(()=>Title, { nullable: true })
    async title(
        @Arg('name') name:string
    ):Promise<Title | undefined>{
        const qb = await getConnection()
            .createQueryBuilder()
            .select("title")
            .from(Title,"title")
            .where("title.name = :name", {name: name})
            .getOne();
        return qb
    }
    
}