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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const prisma_service_1 = require("../prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers(order, limit) {
        const users = await this.prisma.user.findMany({
            orderBy: { coins: order ? 'asc' : 'desc' },
            take: limit,
        });
        users.map((user, index) => {
            user.rating = index + 1;
        });
        return users;
    }
    async getUser(id) {
        const users = await this.prisma.user.findMany({
            orderBy: { coins: 'desc' },
        });
        users.map((user, index) => {
            user.rating = index + 1;
        });
        return users.find((user) => user.id === id);
    }
    async updateUser(id, updateUserDto) {
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid user id');
        }
        return this.prisma.user.update({
            where: { id },
            data: {
                ...updateUserDto,
                coins: {
                    increment: updateUserDto.coins,
                },
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map