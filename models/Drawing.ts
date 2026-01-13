import { Schema, model, models } from "mongoose";

export interface DrawingDocument {
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const DrawingSchema = new Schema<DrawingDocument>(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Drawing =
  models.Drawing || model<DrawingDocument>("Drawing", DrawingSchema);
