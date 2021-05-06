import "reflect-metadata";
import {__prod__} from "./constants";
import express from 'express';
// import { Genre } from "./entities/Genre";
import { Album } from "./entities/Album";
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
//import { GenreResolver } from "./resolvers/genre";
import cors from 'cors'
import { createConnection } from 'typeorm'
import { AlbumResolver } from "./resolvers/album";
import { CityResolver } from "./resolvers/city";
import { Artist } from "./entities/Artist";
import { City } from "./entities/City";
import { Country } from "./entities/Country";
import { Location } from "./entities/Location";
import { ReleaseDate } from "./entities/ReleaseDate";
import { Title } from "./entities/Title";
import { CountryResolver } from "./resolvers/country";
import { ArtistResolver } from "./resolvers/artist";
import { TitleResolver } from "./resolvers/title";
import { ReleaseDateResolver } from "./resolvers/releaseDate";
import { Genre } from "./entities/Genre";
import { GenreResolver } from "./resolvers/genre";
import { LocationResolver } from "./resolvers/location";

//import {Album} from './entities/Album'

const main = async () => {
    const conn = await createConnection({
        type:'postgres',
        database: 'bandcamp',
        username: 'Vivek',
        logging: true,
        synchronize: true,
        entities: [City,Country,Title,Artist,ReleaseDate,Genre,Album,Location]
    })
  
    
    // const orm = await MikroORM.init(microConfig);
    // await orm.getMigrator().up();

    const app = express();

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [CityResolver, CountryResolver,TitleResolver,ReleaseDateResolver,ArtistResolver,GenreResolver,AlbumResolver,LocationResolver],
            validate: false,
        }),
        
        context: ()=>({ })
    });

    apolloServer.applyMiddleware({ 
        app,
        cors: false
     });

    app.listen(4000, ()=> {
        console.log('server started on localhost:4000')
    })
    //const location = orm.em.create(Location, {city: 'Berlin', country:'Germany'});
    //await orm.em.persistAndFlush(location); 

    // const locations = await orm.em.find(Location, {});
    // console.log(locations)
};



main().catch((err) => {
    console.error(err);
});