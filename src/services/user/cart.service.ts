import cartRepository from "../../repositories/user/cart.repository";
import { UpdateCartDtoType } from "../../dtos/user/cart.dto";

export class CartService {
    async getCartByUserId(userId: string) {
        return cartRepository.getCartByUserId(userId);
    }

    async updateCart(userId: string, updates: UpdateCartDtoType) {
        return cartRepository.createOrUpdateCart(userId, updates);
    }

    async clearCart(userId: string) {
        return cartRepository.clearCart(userId);
    }
}

export default new CartService();
