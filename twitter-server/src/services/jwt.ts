import { IUser } from "../Model/UserModel";
import JWT from "jsonwebtoken";

export const JWT_SECRET = "secretsecret";
class JwtService {
  public static async GenerateTokenForUser(user: IUser) {
    const payload = {
      id: user._id,
      email: user?.email,
    };

    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }
}

export default JwtService;
