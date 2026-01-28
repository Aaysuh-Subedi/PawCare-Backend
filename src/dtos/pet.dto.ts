import z from "zod";
import { PetSchema } from "../types/pet.type";

// User should NOT send ownerId in request - it's auto-added from JWT
export const CreatePetDTOSchema = PetSchema.pick({
    name: true,
    species: true,
    imageUrl: true
}).extend({
    breed: z.string().min(2).optional(),
    age: z.coerce.number().min(0).optional(), // Changed: z.coerce.number()
    weight: z.coerce.number().min(0).optional(), // Changed: z.coerce.number()
}).refine(
    (data) => data.age === undefined || data.age >= 0,
    {
        message: "Age must be a non-negative number",
    }
);

export type CreatePetDTO = z.infer<typeof CreatePetDTOSchema>;

// Don't allow updating ownerId
export const UpdatePetDTOSchema = PetSchema.pick({
    name: true,
    species: true,
    imageUrl: true
}).extend({
    breed: z.string().min(2).optional(),
    age: z.coerce.number().min(0).optional(), // Changed: z.coerce.number()
    weight: z.coerce.number().min(0).optional(), // Changed: z.coerce.number()
}).partial();

export type UpdatePetDTO = z.infer<typeof UpdatePetDTOSchema>;
// ```

// ## What Changed?

// - `z.number()` → `z.coerce.number()`
// - `z.coerce.number()` automatically converts string "2" to number 2
// - This works for both `age` and `weight` fields

// ## Now Test in Postman Again

// **POST** `http://localhost:5050/api/pet`

// **Headers:**
// ```
// Authorization: Bearer YOUR_TOKEN_HERE