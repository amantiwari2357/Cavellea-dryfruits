import { compareArrays } from "@/lib/utils";
import { Discount } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";
// import { PayloadAction } from "@reduxjs/toolkit";

const calcAdjustedTotalPrice = (
  totalPrice,
  data,
  quantity
) => {
  return (
    (totalPrice + data.discount.percentage > 0
      ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
      : data.discount.amount > 0
      ? Math.round(data.price - data.discount.amount)
      : data.price) * (quantity ? quantity : data.quantity)
  );
};

/**
 * @typedef {Object} RemoveCartItem
 * @property {number} id
 * @property {string[]} attributes
 */

/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {string} name
 * @property {string} srcUrl
 * @property {number} price
 * @property {string[]} attributes
 * @property {Discount} discount
 * @property {number} quantity
 */

/**
 * @typedef {Object} Cart
 * @property {CartItem[]} items
 * @property {number} totalQuantities
 */

// Define a type for the slice state
/**
 * @typedef {Object} CartsState
 * @property {Cart|null} cart
 * @property {number} totalPrice
 * @property {number} adjustedTotalPrice
 * @property {"update"|"add"|"delete"|null} action
 */

// Define the initial state using that type
const initialState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
  action: null,
};

export const cartsSlice = createSlice({
  name: "carts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // if cart is empty then add
      if (state.cart === null) {
        state.cart = {
          items: [action.payload],
          totalQuantities: action.payload.quantity,
        };
        state.totalPrice =
          state.totalPrice + action.payload.price * action.payload.quantity;
        state.adjustedTotalPrice =
          state.adjustedTotalPrice +
          calcAdjustedTotalPrice(state.totalPrice, action.payload);
        return;
      }

      // check item in cart
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (isItemInCart) {
        state.cart = {
          ...state.cart,
          items: state.cart.items.map((eachCartItem) => {
            if (
              eachCartItem.id === action.payload.id
                ? !compareArrays(
                    eachCartItem.attributes,
                    isItemInCart.attributes
                  )
                : eachCartItem.id !== action.payload.id
            )
              return eachCartItem;

            return {
              ...isItemInCart,
              quantity: action.payload.quantity + isItemInCart.quantity,
            };
          }),
          totalQuantities: state.cart.totalQuantities + action.payload.quantity,
        };
        state.totalPrice =
          state.totalPrice + action.payload.price * action.payload.quantity;
        state.adjustedTotalPrice =
          state.adjustedTotalPrice +
          calcAdjustedTotalPrice(state.totalPrice, action.payload);
        return;
      }

      state.cart = {
        ...state.cart,
        items: [...state.cart.items, action.payload],
        totalQuantities: state.cart.totalQuantities + action.payload.quantity,
      };
      state.totalPrice =
        state.totalPrice + action.payload.price * action.payload.quantity;
      state.adjustedTotalPrice =
        state.adjustedTotalPrice +
        calcAdjustedTotalPrice(state.totalPrice, action.payload);
    },
    removeCartItem: (state, action) => {
      if (state.cart === null) return;

      // check item in cart
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (isItemInCart) {
        state.cart = {
          ...state.cart,
          items: state.cart.items
            .map((eachCartItem) => {
              if (
                eachCartItem.id === action.payload.id
                  ? !compareArrays(
                      eachCartItem.attributes,
                      isItemInCart.attributes
                    )
                  : eachCartItem.id !== action.payload.id
              )
                return eachCartItem;

              return {
                ...isItemInCart,
                quantity: eachCartItem.quantity - 1,
              };
            })
            .filter((item) => item.quantity > 0),
          totalQuantities: state.cart.totalQuantities - 1,
        };

        state.totalPrice = state.totalPrice - isItemInCart.price * 1;
        state.adjustedTotalPrice =
          state.adjustedTotalPrice -
          calcAdjustedTotalPrice(isItemInCart.price, isItemInCart, 1);
      }
    },
    remove: (
      state,
      action
    ) => {
      if (!state.cart) return;

      // check item in cart
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (!isItemInCart) return;

      state.cart = {
        ...state.cart,
        items: state.cart.items.filter((pItem) => {
          return pItem.id === action.payload.id
            ? !compareArrays(pItem.attributes, isItemInCart.attributes)
            : pItem.id !== action.payload.id;
        }),
        totalQuantities: state.cart.totalQuantities - isItemInCart.quantity,
      };
      state.totalPrice =
        state.totalPrice - isItemInCart.price * isItemInCart.quantity;
      state.adjustedTotalPrice =
        state.adjustedTotalPrice -
        calcAdjustedTotalPrice(
          isItemInCart.price,
          isItemInCart,
          isItemInCart.quantity
        );
    },
  },
});

export const { addToCart, removeCartItem, remove } = cartsSlice.actions;

export default cartsSlice.reducer;
