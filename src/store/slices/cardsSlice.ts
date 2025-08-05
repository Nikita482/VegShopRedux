import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type CardType = {
  id: number;
  name: string;
  description: string;
  image?: string;
  price: number;
  count: number;
};

interface CardsState {
  items: CardType[];
  cart: CardType[];
  loading: boolean;
}

const initialState: CardsState = {
  items: [],
  cart: [],
  loading: false,
};

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const res = await fetch(
    "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
  );
  const data = await res.json();
  return data;
});

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const cartItem = state.cart.find((i) => i.id === item.id);

      if (!cartItem) {
        state.cart.push({ ...item });
      } else {
        cartItem.count += item.count;
        const unitPrice = cartItem.price / (cartItem.count - item.count);
        cartItem.price = unitPrice * cartItem.count;
      }
    },
    incrementCount: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        const unitPrice = item.price / item.count;
        item.count++;
        item.price = unitPrice * item.count;
      }
    },
    decrementCount: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && item.count > 1) {
        const unitPrice = item.price / item.count;
        item.count--;
        item.price = unitPrice * item.count;
      }
    },
    incrementCartCount: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((i) => i.id === id);
      if (item) {
        const unitPrice = item.price / item.count;
        item.count++;
        item.price = unitPrice * item.count;
      }
    },
    decrementCartCount: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((i) => i.id === id);
      if (item && item.count > 1) {
        const unitPrice = item.price / item.count;
        item.count--;
        item.price = unitPrice * item.count;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.items = action.payload.map((item: CardType) => ({
        ...item,
        count: item.count ?? 1,
      }));
    });
  },
});

export const {
  addToCart,
  incrementCount,
  decrementCount,
  incrementCartCount,
  decrementCartCount,
} = cardsSlice.actions;
export default cardsSlice.reducer;
