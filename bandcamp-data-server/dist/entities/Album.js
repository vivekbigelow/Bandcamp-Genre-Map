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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Artist_1 = require("./Artist");
const City_1 = require("./City");
const Country_1 = require("./Country");
const Location_1 = require("./Location");
const Genre_1 = require("./Genre");
const ReleaseDate_1 = require("./ReleaseDate");
const Title_1 = require("./Title");
let Album = class Album extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = Date;
        this.updatedAt = Date;
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Album.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.ManyToOne(() => Title_1.Title, title => title.albums),
    __metadata("design:type", Title_1.Title)
], Album.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => Artist_1.Artist),
    typeorm_1.ManyToOne(() => Artist_1.Artist, artist => artist.albums),
    __metadata("design:type", Artist_1.Artist)
], Album.prototype, "artist", void 0);
__decorate([
    type_graphql_1.Field(() => ReleaseDate_1.ReleaseDate),
    typeorm_1.ManyToOne(() => ReleaseDate_1.ReleaseDate, releaseDate => releaseDate.albums),
    __metadata("design:type", ReleaseDate_1.ReleaseDate)
], Album.prototype, "releaseDate", void 0);
__decorate([
    type_graphql_1.Field(() => City_1.City),
    typeorm_1.ManyToOne(() => City_1.City, city => city.albums),
    __metadata("design:type", City_1.City)
], Album.prototype, "city", void 0);
__decorate([
    type_graphql_1.Field(() => Country_1.Country),
    typeorm_1.ManyToOne(() => Country_1.Country, country => country.albums),
    __metadata("design:type", Country_1.Country)
], Album.prototype, "country", void 0);
__decorate([
    type_graphql_1.Field(() => Location_1.Location),
    typeorm_1.ManyToOne(() => Location_1.Location, location => location.albums),
    __metadata("design:type", Location_1.Location)
], Album.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Album.prototype, "url", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Album.prototype, "numberTracks", void 0);
__decorate([
    type_graphql_1.Field(() => [Genre_1.Genre]),
    typeorm_1.ManyToMany(() => Genre_1.Genre, genre => genre.albums),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Album.prototype, "genres", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], Album.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Album.prototype, "updatedAt", void 0);
Album = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Album);
exports.Album = Album;
//# sourceMappingURL=Album.js.map