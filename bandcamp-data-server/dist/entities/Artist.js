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
exports.Artist = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Album_1 = require("./Album");
let Artist = class Artist extends typeorm_1.BaseEntity {
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
], Artist.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Artist.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(() => Album_1.Album, album => album.artist),
    __metadata("design:type", Array)
], Artist.prototype, "albums", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], Artist.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Artist.prototype, "updatedAt", void 0);
Artist = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Artist);
exports.Artist = Artist;
//# sourceMappingURL=Artist.js.map