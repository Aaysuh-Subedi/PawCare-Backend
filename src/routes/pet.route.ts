import { Router } from "express";
import { PetController } from "../controller/pet.controller";
import { authorizedMiddleware } from "../middleware/authorization.middleware";
import { uploads } from "../middleware/upload.middleware";

const router = Router();
const petController = new PetController();

// All routes require authentication
router.use(authorizedMiddleware);

// Get all pets for logged-in user
router.get("/", (req, res) => petController.getAllUserPets(req, res));

// Create a new pet
router.post(
    "/",
    uploads.single('image'),
    (req, res) => petController.createPet(req, res)
);

// Get single pet by ID
router.get("/:id", (req, res) => petController.getPet(req, res));

// Update pet by ID
router.put(
    "/:id",
    uploads.single('image'),
    (req, res) => petController.updatePet(req, res)
);

// Delete pet by ID
router.delete("/:id", (req, res) => petController.deletePet(req, res));

export default router;


// ## How to Test in Postman

// ### 1. **Login First**
// ```
// POST http://localhost:5050/api/auth/login
// Body (JSON):
// {
//     "email": "user@examplegmail.com",
//     "password": "password123"
// }
// ```
// Copy the `token` from the response.

// ### 2. **Add Pet (as User A)**
// ```
// POST http://localhost:5050/api/pet
// Headers:
// - Authorization: Bearer YOUR_TOKEN_HERE

// Body (form-data):
// - name: kitty
// - species: cat
// - breed: persian
// - age: 2
// - weight: 10
// - image: [select file]
// ```

// **DO NOT send `ownerId`** - it's automatically added from your JWT token!

// ### 3. **Get All Your Pets**
// ```
// GET http://localhost:5050/api/pet
// Headers:
// - Authorization: Bearer YOUR_TOKEN_HERE
// ```

// ### 4. **Get Single Pet**
// ```
// GET http://localhost:5050/api/pet/:petId
// Headers:
// - Authorization: Bearer YOUR_TOKEN_HERE
// ```

// ### 5. **Update Pet**
// ```
// PUT http://localhost:5050/api/pet/:petId
// Headers:
// - Authorization: Bearer YOUR_TOKEN_HERE

// Body (form-data):
// - name: kitty updated
// - age: 3
// ```

// ### 6. **Delete Pet**
// ```
// DELETE http://localhost:5050/api/pet/:petId
// Headers:
// - Authorization: Bearer YOUR_TOKEN_HERE