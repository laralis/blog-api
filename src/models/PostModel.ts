import { BaseModel } from "../lib/BaseModel";

enum Status {
  blog = "blog",
  site = "site",
}

interface Fields {
  post: string;
  title: string;
  description: string;
  type: Status;
  user_id: number;
}

export class PostModel extends BaseModel<Fields> {
  constructor() {
    super("posts");
  }
}
