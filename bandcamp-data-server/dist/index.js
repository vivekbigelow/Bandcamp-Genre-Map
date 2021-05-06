"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const Album_1 = require("./entities/Album");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const album_1 = require("./resolvers/album");
const city_1 = require("./resolvers/city");
const Artist_1 = require("./entities/Artist");
const City_1 = require("./entities/City");
const Country_1 = require("./entities/Country");
const Location_1 = require("./entities/Location");
const ReleaseDate_1 = require("./entities/ReleaseDate");
const Title_1 = require("./entities/Title");
const country_1 = require("./resolvers/country");
const artist_1 = require("./resolvers/artist");
const title_1 = require("./resolvers/title");
const releaseDate_1 = require("./resolvers/releaseDate");
const Genre_1 = require("./entities/Genre");
const genre_1 = require("./resolvers/genre");
const location_1 = require("./resolvers/location");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: 'postgres',
        database: 'bandcamp',
        username: 'Vivek',
        logging: true,
        synchronize: true,
        entities: [City_1.City, Country_1.Country, Title_1.Title, Artist_1.Artist, ReleaseDate_1.ReleaseDate, Genre_1.Genre, Album_1.Album, Location_1.Location]
    });
    const app = express_1.default();
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [city_1.CityResolver, country_1.CountryResolver, title_1.TitleResolver, releaseDate_1.ReleaseDateResolver, artist_1.ArtistResolver, genre_1.GenreResolver, album_1.AlbumResolver, location_1.LocationResolver],
            validate: false,
        }),
        context: () => ({})
    });
    apolloServer.applyMiddleware({
        app,
        cors: false
    });
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map