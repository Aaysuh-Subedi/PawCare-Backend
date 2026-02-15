import { CartModel, ICart } from "../../models/user/cart.model";
import { UpdateCartDtoType } from "../../dtos/user/cart.dto";

export class CartRepository {
    async getCartByUserId(userId: string): Promise<ICart | null> {
        return CartModel.findOne({ userId }).exec();
    }

    async createOrUpdateCart(userId: string, updates: UpdateCartDtoType): Promise<ICart> {
        return CartModel.findOneAndUpdate(
            { userId },
            { $set: { items: updates.items || [] } },
            { new: true, upsert: true }
        ).exec() as Promise<ICart>;
    }

    async clearCart(userId: string): Promise<ICart | null> {
        return CartModel.findOneAndUpdate({ userId }, { $set: { items: [] } }, { new: true }).exec();
    }
}

export default new CartRepository();
