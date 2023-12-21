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
exports.AuthService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/user.schema");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(cud) {
        const salt = await bcrypt.genSalt(10);
        cud.password = await bcrypt.hash(cud.password, salt);
        return await this.userModel.create(cud);
    }
    async login(username, pwd) {
        const user = await this.userModel.findOne({ username }).exec();
        if (!user)
            throw new common_1.NotFoundException('Wrong credentials!');
        const match = await bcrypt.compare(pwd, user.password);
        if (!match)
            throw new common_1.NotFoundException('Wrong credentials!');
        return user;
    }
    async findById(email) {
        return await this.userModel.findOne({ where: { email: email } }).exec();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map