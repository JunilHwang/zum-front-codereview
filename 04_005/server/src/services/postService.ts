import { BaseModel } from "../model/base";
import { Post } from "../model/post";
import { Answer } from "../type/type";

export abstract class Service<T extends BaseModel> {
  protected model: T[] = [];
  abstract createItem(item: Omit<T, keyof BaseModel>): Answer;
  abstract getAllItems(): Answer;
  abstract getItemById(id: number): Answer;
  abstract updateItem(id: number, item: T): Answer;
  abstract deleteItem(id: number): Answer;
}

class PostService extends Service<Post> {
  private generateId(): number {
    const { length } = this.model;
    if (length === 0) return 1;
    return this.model[length - 1].id + 1;
  }

  private isValid(id: number): boolean {
    if (id < 1 || id > this.generateId()) return false;
    return Boolean(this.model.find((model) => model.id === id));
  }

  createItem(item: Omit<Post, keyof BaseModel>): Answer {
    const base: BaseModel = {
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const post = { ...item, ...base };
    this.model = [...this.model, post];
    return { result: true };
  }

  getAllItems(): Answer {
    return {
      result: true,
      data: this.model.map(({ content, ...rest }) => rest),
    };
  }

  getItemById(id: number): Answer {
    const isValid = this.isValid(id);
    if (isValid) {
      return {
        result: true,
        data: this.model.find((model) => model.id === id),
      };
    }

    return { result: false, error: "Not Valid Id" };
  }

  updateItem(id: number, item: Post): Answer {
    const isValid = this.isValid(id);
    if (isValid) {
      this.model = this.model.map((model) =>
        model.id === id ? { ...model, ...item, updatedAt: new Date() } : model
      );
      return { result: true };
    }

    return { result: false, error: "Not Valid Id" };
  }

  deleteItem(id: number): Answer {
    const isValid = this.isValid(id);
    if (isValid) {
      this.model = this.model.filter((model) => model.id !== id);
      return { result: true };
    }

    return { result: false, error: "Not Valid Id" };
  }
}

export default new PostService();
