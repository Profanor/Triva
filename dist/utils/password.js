"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
//hash the password
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, bcrypt_1.hash)(password, saltRounds);
    return hashedPassword;
});
exports.hashPassword = hashPassword;
//compare the password with the hashed password
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield (0, bcrypt_1.compare)(password, hashedPassword);
    return isMatch;
});
exports.comparePassword = comparePassword;
