"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Genre_1 = require("../entities/Genre");
let GenreResolver = class GenreResolver {
    genres() {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = yield typeorm_1.getConnection()
                .getRepository(Genre_1.Genre)
                .createQueryBuilder("g")
                .leftJoinAndSelect("g.albums", "album")
                .leftJoinAndSelect("album.city", "city")
                .leftJoinAndSelect("album.country", "country")
                .leftJoinAndSelect("album.releaseDate", "releaseDate")
                .leftJoinAndSelect("album.title", "title")
                .leftJoinAndSelect("album.artist", "artist")
                .orderBy("g.name", 'ASC')
                .getMany();
            return genres;
        });
    }
    genre(id) {
        return Genre_1.Genre.findOne(id);
    }
    genreByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield typeorm_1.getConnection()
                .getRepository(Genre_1.Genre)
                .createQueryBuilder("g")
                .where("g.name = :name", { name: name })
                .leftJoinAndSelect("g.albums", "album")
                .leftJoinAndSelect("album.city", "city")
                .leftJoinAndSelect("album.country", "country")
                .leftJoinAndSelect("album.releaseDate", "releaseDate")
                .leftJoinAndSelect("album.title", "title")
                .leftJoinAndSelect("album.artist", "artist")
                .leftJoinAndSelect("album.location", "location")
                .getOne();
            return genre;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Genre_1.Genre]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "genres", null);
__decorate([
    type_graphql_1.Query(() => Genre_1.Genre, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "genre", null);
__decorate([
    type_graphql_1.Query(() => Genre_1.Genre, { nullable: true }),
    __param(0, type_graphql_1.Arg('name', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreResolver.prototype, "genreByName", null);
GenreResolver = __decorate([
    type_graphql_1.Resolver()
], GenreResolver);
exports.GenreResolver = GenreResolver;
//# sourceMappingURL=genre.js.map