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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const tables_1 = require("../config/tables");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "user_uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char' }),
    __metadata("design:type", String)
], User.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char' }),
    __metadata("design:type", String)
], User.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", String)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", String)
], User.prototype, "updated_at", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: tables_1.Tables.USERS })
], User);
exports.User = User;
//# sourceMappingURL=users.js.map