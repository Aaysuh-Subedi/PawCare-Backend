import { CreatePetDTO, UpdatePetDTO } from "../dtos/pet.dto";
import { HttpError } from "../errors/http-error";
import { PetRepository } from "../repositories/pet.repository";

let petRepository = new PetRepository();

export class PetService {
    async createPet(data: CreatePetDTO & { ownerId: string }) {
        const newPet = await petRepository.createPet(data);
        return newPet;
    }

    // Get all pets for a specific user
    async getAllPetsByUserId(userId: string) {
        const pets = await petRepository.getAllPetsByUserId(userId);
        return pets;
    }

    // Get pet by ID, but verify ownership
    async getPetById(petId: string, userId: string) {
        if (!petId) {
            throw new HttpError(400, "Pet ID is required");
        }

        const pet = await petRepository.getPetByIdAndOwner(petId, userId);
        
        if (!pet) {
            throw new HttpError(404, "Pet not found or you don't have permission to view it");
        }

        return pet;
    }

    // Update pet, but verify ownership first
    async updatePetById(petId: string, updates: UpdatePetDTO, userId: string) {
        if (!petId) {
            throw new HttpError(400, "Pet ID is required");
        }

        // First check if pet exists and belongs to user
        const existingPet = await petRepository.getPetByIdAndOwner(petId, userId);
        
        if (!existingPet) {
            throw new HttpError(404, "Pet not found or you don't have permission to update it");
        }

        const updatedPet = await petRepository.updatePetById(petId, updates);
        return updatedPet;
    }

    // Delete pet, but verify ownership first
    async deletePetById(petId: string, userId: string) {
        if (!petId) {
            throw new HttpError(400, "Pet ID is required");
        }

        // First check if pet exists and belongs to user
        const existingPet = await petRepository.getPetByIdAndOwner(petId, userId);
        
        if (!existingPet) {
            throw new HttpError(404, "Pet not found or you don't have permission to delete it");
        }

        const deletedPet = await petRepository.deletePetById(petId);
        return deletedPet;
    }
}