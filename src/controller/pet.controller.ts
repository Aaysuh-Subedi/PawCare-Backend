import { PetService } from "../services/pet.service";
import { CreatePetDTOSchema, UpdatePetDTOSchema } from "../dtos/pet.dto";
import { Request, Response } from "express";
import { IUser } from "../models/user.model";

let petService = new PetService();

export class PetController {
    // Create a new pet for logged-in user
    async createPet(req: Request, res: Response) {
        try {
            // Get user ID from JWT token (set by authorizedMiddleware)
            const userId = (req.user as IUser)._id.toString();
            
            const parsedData = CreatePetDTOSchema.safeParse(req.body);
            
            if (!parsedData.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: parsedData.error.format()
                });
            }

            // Add image URL if file was uploaded
            const petData = {
                ...parsedData.data,
                ownerId: userId, // Automatically assign to logged-in user
                imageUrl: req.file ? `/uploads/${req.file.filename}` : parsedData.data.imageUrl
            };

            const newPet = await petService.createPet(petData);
            
            return res.status(201).json({
                success: true,
                message: "Pet Created",
                data: newPet
            });
        } catch (error: Error | any) {
            return res.status(error.statusCode ?? 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    }

    // Get all pets for logged-in user
    async getAllUserPets(req: Request, res: Response) {
        try {
            const userId = (req.user as IUser)._id.toString();
            const pets = await petService.getAllPetsByUserId(userId);
            
            return res.status(200).json({
                success: true,
                message: "Pets Retrieved",
                data: pets,
                count: pets.length
            });
        } catch (error: Error | any) {
            return res.status(error.statusCode ?? 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    }

    // Get single pet (only if it belongs to logged-in user)
    async getPet(req: Request, res: Response) {
        try {
            const petId = req.params.id;
            const userId = (req.user as IUser)._id.toString();
            
            const pet = await petService.getPetById(petId, userId);
            
            return res.status(200).json({
                success: true,
                message: "Pet Retrieved",
                data: pet
            });
        } catch (error: Error | any) {
            return res.status(error.statusCode ?? 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    }

    // Update pet (only if it belongs to logged-in user)
    async updatePet(req: Request, res: Response) {
        try {
            const petId = req.params.id;
            const userId = (req.user as IUser)._id.toString();
            
            const parsedData = UpdatePetDTOSchema.safeParse(req.body);
            
            if (!parsedData.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: parsedData.error.format()
                });
            }

            // Add image URL if file was uploaded
            const updateData = {
                ...parsedData.data,
                imageUrl: req.file ? `/uploads/${req.file.filename}` : parsedData.data.imageUrl
            };

            const updatedPet = await petService.updatePetById(petId, updateData, userId);
            
            return res.status(200).json({
                success: true,
                message: "Pet Updated",
                data: updatedPet
            });
        } catch (error: Error | any) {
            return res.status(error.statusCode ?? 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    }

    // Delete pet (only if it belongs to logged-in user)
    async deletePet(req: Request, res: Response) {
        try {
            const petId = req.params.id;
            const userId = (req.user as IUser)._id.toString();
            
            const deletedPet = await petService.deletePetById(petId, userId);
            
            return res.status(200).json({
                success: true,
                message: "Pet Deleted",
                data: deletedPet
            });
        } catch (error: Error | any) {
            return res.status(error.statusCode ?? 500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    }
}