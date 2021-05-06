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
exports.Genre = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Album_1 = require("./Album");
let Genre = class Genre extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = Date;
        this.updatedAt = Date;
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Genre.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Genre.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => [Album_1.Album]),
    typeorm_1.ManyToMany(() => Album_1.Album, album => album.genres),
    __metadata("design:type", Array)
], Genre.prototype, "albums", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], Genre.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Genre.prototype, "updatedAt", void 0);
Genre = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Genre);
exports.Genre = Genre;
//# sourceMappingURL=Genre.js.map