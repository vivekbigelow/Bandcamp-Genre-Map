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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Artist_1 = require("../entities/Artist");
let ArtistResolver = class ArtistResolver {
    artists() {
        return Artist_1.Artist.find();
    }
    artist(name) {
        return Artist_1.Artist.findOne({ where: name = name });
    }
};
__decorate([
    type_graphql_1.Query(() => [Artist_1.Artist]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArtistResolver.prototype, "artists", null);
__decorate([
    type_graphql_1.Query(() => Artist_1.Artist, { nullable: true }),
    __param(0, type_graphql_1.Arg('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtistResolver.prototype, "artist", null);
ArtistResolver = __decorate([
    type_graphql_1.Resolver()
], ArtistResolver);
exports.ArtistResolver = ArtistResolver;
//# sourceMappingURL=artist.js.map