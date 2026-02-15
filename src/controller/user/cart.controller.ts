import { Request, Response, NextFunction } from "express";
import cartService from "../../services/user/cart.service";
import { UpdateCartDto } from "../../dtos/user/cart.dto";
import z from "zod";

class CartController {
    async getCart(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id?.toString();
            if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
            const cart = await cartService.getCartByUserId(userId);
            return res.status(200).json({ success: true, data: cart || { items: [] } });
        } catch (err: any) {
            return res.status(err.statusCode ?? 500).json({ success: false, message: err.message || "Internal Server Error" });
        }
    }

    async updateCart(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id?.toString();
            if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

            const parsed = UpdateCartDto.safeParse(req.body);
            if (!parsed.success) return res.status(400).json({ success: false, message: z.prettifyError(parsed.error) });

            const cart = await cartService.updateCart(userId, parsed.data);
            return res.status(200).json({ success: true, message: "Cart updated", data: cart });
        } catch (err: any) {
            return res.status(err.statusCode ?? 500).json({ success: false, message: err.message || "Internal Server Error" });
        }
    }

    async clearCart(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.id || (req as any).user?._id?.toString();
            if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
            const cart = await cartService.clearCart(userId);
            return res.status(200).json({ success: true, message: "Cart cleared", data: cart });
        } catch (err: any) {
            return res.status(err.statusCode ?? 500).json({ success: false, message: err.message || "Internal Server Error" });
        }
    }
}

export default new CartController();
