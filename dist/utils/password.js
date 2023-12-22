"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
//hash the password
const hashPassword = async (password) => {
    const hashedPassword = await (0, bcrypt_1.hash)(password, saltRounds);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
//compare the password with the hashed password
const comparePassword = async (password, hashedPassword) => {
    const isMatch = await (0, bcrypt_1.compare)(password, hashedPassword);
    return isMatch;
};
exports.comparePassword = comparePassword;
