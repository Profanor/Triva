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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = __importDefault(require("../../logger"));
// Generate a random secret key of sufficient length
const generateSecretKey = () => {
    return crypto_1.default.randomBytes(32).toString('hex'); // Generate a 256-bit (32-byte) random string
};
const key = process.env.SECRET_KEY || generateSecretKey();
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing' });
    }
    // Verify token
    jsonwebtoken_1.default.verify(token, key, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            logger_1.default.error('JWT verification failed:', err.message);
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Access denied. Token expired' });
            }
            else {
                return res.status(401).json({ message: 'Access denied. Invalid token' });
            }
        }
        // Token is verified, add user information to the request object
        req.user = {
            userId: decodedToken.userId,
            email: decodedToken.email
        };
        // Proceed to the next middleware or route handler
        next();
    }));
};
exports.default = authenticateToken;
