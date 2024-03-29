import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount:0
}
const cartReducer = (state, action) => {
    if (action.type == 'ADD') {
        const updatedtotalAmount = state.totalAmount + action.item.amount * action.item.price;
        const existingCartItemIndex = state.items.findIndex(item =>
            item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;
        if (existingCartItem) {
        let updatedItem;

            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex]=updatedItem
        }
        else {
            updatedItems=state.items.concat(action.item)
        }


        return {
            items: updatedItems,
            totalAmount:updatedtotalAmount
    }
    }
    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item =>
            item.id === action.id)
            const existingItem = state.items[existingCartItemIndex]
        const updatedtotalAmount = state.totalAmount - existingItem.price
        let updatedItems
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        }
        else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex]=updatedItem
        }
        return {
            items: updatedItems
            ,totalAmount: updatedtotalAmount
}
    }
    if (action.type == 'CLEAR') {
        return defaultCartState;        
    }
    if (action.type == 'CLEAR') {
    return defaultCartState;
            
        }
    return defaultCartState;
} 

const CartProvider = (props) => {
const [curtState,dispatchCartAction]=useReducer(cartReducer,defaultCartState)

    const addItemHandler = (item) => {
        dispatchCartAction({
            type:'ADD',
            item:item
    })
    }
    const removeItemHandler = (id) => {
        dispatchCartAction({
            type:'REMOVE',
            id:id
    })
    }
    const clearCartHandler = () => {
        dispatchCartAction({
            type:'CLEAR'
        })
}
    const cartContext={
        items: curtState.items,
        totalAmount: curtState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart:clearCartHandler
    }
    return <CartContext.Provider value={cartContext}>
    {props.children}
    </CartContext.Provider>
}
export default CartProvider;