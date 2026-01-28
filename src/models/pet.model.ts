import mongoose, {Document, Schema} from "mongoose";
import { PetType } from "../types/pet.type";


const PetSchema: Schema = new Schema(
    {
        name: {type: String, required: true},
        species: {type: String, enum: ["dog", "cat", "bird", "other"], required: true},
        breed: {type: String, required: false},
        age: {type: Number, required: false},
        weight: {type: Number, required: false},
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        ownerId: {type: String, required: true},
        imageUrl: {type: String, required: false} // for image URL storage
    },
    {
        timestamps: true,
    }
);

export interface IPet extends PetType, Document { //extends Document to include mongoose document properties
    _id: mongoose.Types.ObjectId;
    userId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const PetModel = mongoose.model<IPet>("Pet", PetSchema); 
// PetModel will be used to interact with the pets collection in MongoDB
// It provides methods to create, read, update, and delete pet documents