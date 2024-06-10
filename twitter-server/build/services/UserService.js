"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../Model/UserModel");
const bcrypt_1 = __importDefault(require("./bcrypt"));
const jwt_1 = __importStar(require("./jwt"));
class UserService {
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = payload;
            console.log(payload);
            const existingUser = yield UserModel_1.User.findOne({ email });
            if (existingUser)
                return { status: "User already exists", user: null };
            const hashedPassword = yield bcrypt_1.default.HashPassword(password);
            const user = yield UserModel_1.User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });
            return { status: "User created successfully", user };
        });
    }
    static loginUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserModel_1.User.findOne({ email });
            if (!user)
                return { status: "User does not exists", token: null };
            const correctPassword = yield bcrypt_1.default.ComparePassword(password, user === null || user === void 0 ? void 0 : user.password);
            if (!correctPassword)
                return { status: "Check your credentials", token: null };
            const token = yield jwt_1.default.GenerateTokenForUser(user);
            return {
                status: "User logged in successfully",
                token,
            };
        });
    }
    static getUserFromToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = jsonwebtoken_1.default.verify(token, jwt_1.JWT_SECRET);
            if (typeof decodedToken !== "string" && decodedToken.id) {
                const user = yield UserModel_1.User.findById(decodedToken.id);
                // console.log(user);
                return user;
            }
        });
    }
}
exports.default = UserService;
