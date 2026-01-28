import z from "zod";

export const PetSchema = z.object({
    name: z.string().min(2),
    species: z.enum(["dog", "cat", "bird", "other"]),
    breed: z.string().min(2).optional(),
    age: z.number().min(0).optional(),
    weight: z.number().min(0).optional(),
    ownerId: z.string(), // Add this
    imageUrl: z.string().optional()
});

export type PetType = z.infer<typeof PetSchema>;