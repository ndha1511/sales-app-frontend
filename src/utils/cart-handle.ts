import { CartItemModel } from "../models/cart-item.model";


export const addToCartLocalStorage = (item: any) => {
    if (checkExistInCart(item)) {
        addQuantity(item);
    } else {
        pushItemCart(item);
    }
}

export const getCartLocalStorage = (): CartItemModel[] => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    }
    else {
        return [];
    }

}

const checkExistInCart = (item: CartItemModel): boolean => {
    const cart = getCartLocalStorage();
    if (cart.length > 0) {
        const filter = cart.filter((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
        if (filter.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}

const pushItemCart = (item: CartItemModel) => {
    const cart = getCartLocalStorage();
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const addQuantity = (item: CartItemModel) => {
    const cart = getCartLocalStorage();
    const filter = cart.filter((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
    if (filter.length > 0) {
        filter[0].quantity = (item.quantity ?? 0) + (filter[0].quantity ?? 0);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const updateItemCart = (item: CartItemModel) => {
    const cart = getCartLocalStorage();
    const filter = cart.filter((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
    if(filter.length > 0) {
        filter[0].quantity = item.quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

}

export const removeItemCart = (item: CartItemModel) => {
    const cart = getCartLocalStorage();
    const index = cart.findIndex((c) => c.productDetail.id === item.productDetail.id);
    if(index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}
