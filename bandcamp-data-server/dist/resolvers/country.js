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
exports.CountryResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Country_1 = require("../entities/Country");
let CountryResolver = class CountryResolver {
    countries() {
        return Country_1.Country.find();
    }
    country(name) {
        return Country_1.Country.findOne({ where: name = name });
    }
};
__decorate([
    type_graphql_1.Query(() => [Country_1.Country]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountryResolver.prototype, "countries", null);
__decorate([
    type_graphql_1.Query(() => Country_1.Country, { nullable: true }),
    __param(0, type_graphql_1.Arg('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryResolver.prototype, "country", null);
CountryResolver = __decorate([
    type_graphql_1.Resolver()
], CountryResolver);
exports.CountryResolver = CountryResolver;
//# sourceMappingURL=country.js.map