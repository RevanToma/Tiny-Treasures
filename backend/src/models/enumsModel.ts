import mongoose from 'mongoose';

export interface EnumDocument {
  clothes: string[];
  toys: string[];
  main: string[];
  [key: string]: string[];
}

const enumSchema = new mongoose.Schema<EnumDocument>({
  clothes: [String],
  toys: [String],
  main: [String],
});

const Enum = mongoose.model<EnumDocument>('Enum', enumSchema);
export default Enum;

// enums: 6452654bfc9f011ef64dd9e1
