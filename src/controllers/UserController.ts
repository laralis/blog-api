import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { Rest } from "../lib/Rest";

export class UserController implements Rest {
  async getOne(req: Request, res: Response) {
    const id = req.params.id;
    const userModel = new UserModel();
    const data = await userModel.getOne(+id);
    res.send(data);
  }
  async update(req: Request, res: Response) {
    const id = req.params.id;
    const values = req.body;
    const userModel = new UserModel();
    const data = await userModel.update(+id, values);
    res.send(data);
  }
  async getAll(req: Request, res: Response) {
    const userModel = new UserModel();
    const data = await userModel.getAll();
    res.send(data);
  }
  async insert(req: Request, res: Response) {
    const values = req.body;
    const userModel = new UserModel();
    const data = await userModel.insert(values);
    res.status(201).send(data);
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const userModel = new UserModel();
    const data = userModel.delete(+id);
    res.send(data);
  }
  async getAllPosts(req: Request, res: Response) {
    const id = req.params.id;
    const userModel = new UserModel();
    const data = await userModel.getAllPosts(+id);
    res.send(data);
  }
}
