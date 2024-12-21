import { Request, Response } from "express";
import { Rest } from "../lib/Rest";
import { PostModel } from "../models/PostModel";

export class PostController implements Rest {
  async getOne(req: Request, res: Response) {
    const id = req.params.id;
    const postModel = new PostModel();
    const data = await postModel.getOne(+id);
    res.send(data);
  }
  async getAll(req: Request, res: Response) {
    const postModel = new PostModel();
    const data = await postModel.getAll();
    res.send(data);
  }
  async insert(req: Request, res: Response) {
    const values = req.body;
    const postModel = new PostModel();
    const data = await postModel.insert(values);
    res.status(201).send(data);
  }
  async update(req: Request, res: Response) {
    const id = req.params.id;
    const values = req.body;
    const postModel = new PostModel();
    const data = await postModel.update(+id, values);
    res.send(data);
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const postModel = new PostModel();
    const data = postModel.delete(+id);
    res.send(data);
  }
}
