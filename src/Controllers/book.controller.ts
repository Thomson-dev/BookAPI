// controllers/book.controller.ts
import { Request, Response } from 'express';
import { BookService } from '../Services/book.service';

const service = new BookService();

export const createBook = async (req: Request, res: Response) => {
  const book = await service.createBook(req.body);
  res.status(201).json(book);
};

// Add others: getBooks, getBookById, updateBook, deleteBook
