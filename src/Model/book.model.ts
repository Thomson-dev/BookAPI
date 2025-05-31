import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define a TypeScript interface for the Book document
export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishedDate: Date;
  pages: number;
  genre: string;
  available: boolean;
  price?: number;
  stock?: number;
  description?: string;
  coverImage?: string;
  rating?: number;
}

// 2. Create the schema with types and required fields
const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  publisher: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  pages: { type: Number, required: true },
  genre: { type: String, required: true },
  available: { type: Boolean, default: true },
  price: Number,
  stock: Number,
  description: String,
  coverImage: String,
  rating: { type: Number, default: 0 },
});

// 3. Export the model with the interface
const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);
export default Book;