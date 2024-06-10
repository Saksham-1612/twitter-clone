import bcrypt from "bcryptjs";

class BcryptService {
  // Method to hash a password
  public static async HashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password: " + (error as Error).message);
    }
  }

  // Method to compare a password with a hashed password
  public static async ComparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error("Error comparing passwords: " + (error as Error).message);
    }
  }
}

export default BcryptService;
