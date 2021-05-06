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
exports.AlbumResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Album_1 = require("../entities/Album");
let AlbumResolver = class AlbumResolver {
    albums() {
        return __awaiter(this, void 0, void 0, function* () {
            const albums = yield typeorm_1.getConnection()
                .getRepository(Album_1.Album)
                .createQueryBuilder("a")
                .leftJoinAndSelect("a.genres", "genre")
                .leftJoinAndSelect("a.title", "title")
                .leftJoinAndSelect("a.artist", "artist")
                .leftJoinAndSelect("a.releaseDate", "releaseDate")
                .leftJoinAndSelect("a.city", "city")
                .leftJoinAndSelect("a.country", "country")
                .leftJoinAndSelect("a.location", "location")
                .getMany();
            return albums;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Album_1.Album]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumResolver.prototype, "albums", null);
AlbumResolver = __decorate([
    type_graphql_1.Resolver()
], AlbumResolver);
exports.AlbumResolver = AlbumResolver;
//# sourceMappingURL=album.js.map