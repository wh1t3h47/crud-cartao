import mongoose, { Document } from 'mongoose';
import cardDTO from '../interfaces/CardDTO';

const CardSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  cvv: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<cardDTO & Document>('card', CardSchema);
