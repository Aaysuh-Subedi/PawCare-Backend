import { PetModel, IPet } from "../models/pet.model";
import { CreatePetDTO } from "../dtos/pet.dto";

export class PetRepository {
    async createPet(data: CreatePetDTO & { ownerId: string }): Promise<IPet> {
        const pet = await PetModel.create({
            name: data.name,
            species: data.species,
            breed: data.breed,
            age: data.age,
            weight: data.weight,
            ownerId: data.ownerId,
            imageUrl: data.imageUrl
        });
        return pet;
    }

    async getPetById(id: string): Promise<IPet | null> {
        return PetModel.findById(id).exec();
    }

    // Get pet by ID and owner
    async getPetByIdAndOwner(id: string, ownerId: string): Promise<IPet | null> {
        return PetModel.findOne({ _id: id, ownerId }).exec();
    }

    // Get all pets for a specific user
    async getAllPetsByUserId(ownerId: string): Promise<IPet[]> {
        return PetModel.find({ ownerId }).sort({ createdAt: -1 }).exec();
    }

    async updatePetById(id: string, updates: Partial<IPet>): Promise<IPet | null> {
        return PetModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    }

    async deletePetById(id: string): Promise<IPet | null> {
        return PetModel.findByIdAndDelete(id).exec();
    }
}