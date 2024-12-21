import { connectDB } from "../config";
import { BaseModel } from "../lib/BaseModel";

interface Fields {
  name: string;
  password: string;
}

export class UserModel extends BaseModel<Fields> {
  constructor() {
    super("users");
  }
  async getAllPosts(id: number) {
    const connection = await connectDB();
    try {
      const [response] = await connection.execute(
        "SELECT * FROM posts where user_id = ?;",
        [id]
      );
      return response;
    } catch (error) {
      throw error;
    } finally {
      await connection.end();
    }
  }
}
