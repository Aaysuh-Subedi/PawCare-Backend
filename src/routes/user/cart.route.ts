import { Router } from "express";
import CartController from "../../controller/user/cart.controller";
import { authorizedMiddleware } from "../../middleware/authorization.middleware";

const router = Router();

// Get current user's cart
router.get("/", authorizedMiddleware, (req, res, next) => CartController.getCart(req, res, next));
// Update/replace cart
router.put("/", authorizedMiddleware, (req, res, next) => CartController.updateCart(req, res, next));
// Clear cart
router.delete("/", authorizedMiddleware, (req, res, next) => CartController.clearCart(req, res, next));

export default router;
