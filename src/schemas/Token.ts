import mongoose, { Document } from 'mongoose';
import Tokens from '../models/Tokens';

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(),
  },
});

export default mongoose.model<Tokens & Document>('token', TokenSchema);
