import { connectDB } from "../config";

type WithId<T> = T & { id: number };

export abstract class BaseModel<T extends object> {
  private name: string = "";
  constructor(name: string) {
    this.name = name;
  }
  async getOne(id: number) {
    const connection = await connectDB();
    try {
      const [response] = await connection.execute(
        `select * from ${this.name} where id= ${id}`
      );
      return response as WithId<T>;
    } catch (error) {
      throw error;
    } finally {
      await connection.end();
    }
  }
  async getAll() {
    const connection = await connectDB();
    try {
      const [response] = await connection.execute(`select * from ${this.name}`);
      return response as WithId<T>[];
    } catch (error) {
      throw error;
    } finally {
      await connection.end();
    }
  }
  async insert(data: T) {
    const connection = await connectDB();
    try {
      const fields = Object.keys(data).join(", ");
      const values = Object.values(data)
        .map((item) => `"${item}"`)
        .join(", ");
      const [response] = await connection.execute(
        `insert into ${this.name} (${fields}) values (${values});`
      );

      return response;
    } catch (error) {
      throw error;
    } finally {
      await connection.end();
    }
  }

  async update(id: number, data: Partial<T>) {
    const connection = await connectDB();
    try {
      const entries = Object.entries(data);
      const values = entries
        .map(([key, value]) => `${key}="${value}"`)
        .join(",");
      const [response] = await connection.execute(
        `update ${this.name} set ${values} where id=${id}`
      );

      return response;
    } catch (error) {
      throw error;
    } finally {
      await connection.end();
    }
  }
  async delete(id: number) {
    const connection = await connectDB();
    try {
      await connection.execute(`delete from ${this.name} where id=?`, [id]);
    } catch (error) {
      throw error;
    } finally {
      await connection.end();
    }
  }
}
