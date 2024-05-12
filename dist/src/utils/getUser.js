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
exports.getUser = void 0;
const User_1 = __importDefault(require("../model/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ where: { email } });
        return user;
    }
    catch (error) {
        console.error('error retrieving user from the database:', error);
        throw error;
    }
});
exports.getUser = getUser;
// export const getUserByToken = async (token: string): Promise<User | null> => {
//     try {
//       // Verify and decode the JWT token
//       const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY || ''); // Verify the token using your secret key
//       // Extract the user ID from the decoded token
//       const userId = decodedToken.userId;
//       console.log('DecodedToken is:', decodedToken);
//       // Fetch the user by user ID
//       const user = await User.findByPk(userId);
//       return user;
//     } catch(error) {
//       console.error('Error retrieving user from the database:', error);
//       throw error;
//     }
//   };
