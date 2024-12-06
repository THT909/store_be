import { Types } from 'mongoose';

export function isValidMongoId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}
