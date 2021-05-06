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
exports.ReleaseDateResolver = void 0;
const type_graphql_1 = require("type-graphql");
const ReleaseDate_1 = require("../entities/ReleaseDate");
let ReleaseDateResolver = class ReleaseDateResolver {
    dates() {
        return ReleaseDate_1.ReleaseDate.find();
    }
    date(date) {
        return ReleaseDate_1.ReleaseDate.findOne({ where: date = date });
    }
};
__decorate([
    type_graphql_1.Query(() => [ReleaseDate_1.ReleaseDate]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReleaseDateResolver.prototype, "dates", null);
__decorate([
    type_graphql_1.Query(() => ReleaseDate_1.ReleaseDate, { nullable: true }),
    __param(0, type_graphql_1.Arg('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReleaseDateResolver.prototype, "date", null);
ReleaseDateResolver = __decorate([
    type_graphql_1.Resolver()
], ReleaseDateResolver);
exports.ReleaseDateResolver = ReleaseDateResolver;
//# sourceMappingURL=releaseDate.js.map