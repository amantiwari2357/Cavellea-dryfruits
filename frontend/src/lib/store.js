import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "@/components/storage";
import productsReducer from "./features/products/productsSlice";
import cartsReducer from "./features/carts/cartsSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["carts"],
};

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

const store = makeStore().store;

// TypeScript type aliases removed because this is a JavaScript file.

export default store;
