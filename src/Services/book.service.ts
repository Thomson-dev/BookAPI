
import BookModel from '../Model/book.model';
import { IBook } from '../Model/book.model';



export class BookService {
  async createBook(data:IBook) {
    return await BookModel.create(data);
  }

  async getBooks() {
    return await BookModel.find();
  }

  async getBookById(id: string) {
    return await BookModel.findById(id);
  }

  async updateBook(id: string, data: IBook) {
    return await BookModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBook(id: string) {
    return await BookModel.findByIdAndDelete(id);
  }
}
