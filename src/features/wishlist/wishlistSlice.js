import { createSlice } from '@reduxjs/toolkit';

// get nauvau prouducts dans localsstorage if exist
const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist')) || [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // ajouter ou suprimer le prouduit(Toggle)
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex(item => item.id === product.id);
      
      if (index >= 0) {
        // si il exist va suprimer
        state.items.splice(index, 1);
      } else {
        // si non exist va ajouter
        state.items.push(product);
      }
      // enregistrement de localStorage
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    // suprimer le produit
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    }
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;

// Selector pour verifier le produit exist dans fav ou non 
export const selectIsInWishlist = (state, id) => 
  state.wishlist.items.some(item => item.id === id);

export default wishlistSlice.reducer;