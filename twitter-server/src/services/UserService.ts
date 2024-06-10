import JWT from "jsonwebtoken";
import { User } from "../Model/UserModel";
import BcryptService from "./bcrypt";
import JwtService, { JWT_SECRET } from "./jwt";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}
export interface LoginUserPayload {
  email: string;
  password: string;
}
class UserService {
  public static async createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    console.log(payload);

    const existingUser = await User.findOne({ email });
    if (existingUser) return { status: "User already exists", user: null };
    const hashedPassword = await BcryptService.HashPassword(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return { status: "User created successfully", user };
  }

  public static async loginUser(payload: LoginUserPayload) {
    const { email, password } = payload;

    const user = await User.findOne({ email });
    if (!user) return { status: "User does not exists", token: null };

    const correctPassword = await BcryptService.ComparePassword(
      password,
      user?.password
    );
    if (!correctPassword)
      return { status: "Check your credentials", token: null };

    const token = await JwtService.GenerateTokenForUser(user);

    return {
      status: "User logged in successfully",
      token,
    };
  }
  public static async getUserFromToken(token: string) {
    const decodedToken = JWT.verify(token, JWT_SECRET);
    if (typeof decodedToken !== "string" && decodedToken.id) {
      const user = await User.findById(decodedToken.id);
      // console.log(user);
      return user;
    }
  }
}
export default UserService;
