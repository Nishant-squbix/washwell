import {createSlice} from '@reduxjs/toolkit';

export var UserSlice = createSlice({
  name: 'user',
  initialState: {
    Token: null,
    user: {},
    comment: false,
    like: false,
    data: null,
    cartlab: null,
    cart: [],
    addedtest: [],
  },
  reducers: {
    setToken: (state, action) => {
      console.log('Token set', JSON.stringify(action.payload));
      state.Token = action.payload;
    },
    setUser: (state, action) => {
      console.log('user set', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    setComment: (state, action) => {
      console.log('comment', action.payload);
      state.comment = action.payload;
    },
    setLikes: (state, action) => {
      console.log('likejbhgvgv', action.payload);
      state.like = action.payload;
    },
    setCartlab: (state, action) => {
      console.log('cart lab', JSON.stringify(action.payload));
      state.cartlab = action.payload;
    },
    setCart: (state, action) => {
      console.log('Phone number set', JSON.stringify(action.payload));

      if (state.cart != null) {
        state.cart = [
          {
            vnumber: action.payload.vnumber,
            dname: action.payload.dname,
            dmobile: action.payload.dmobile,
            unit: action.payload.unit,
            amount: action.payload.amount,
            pin: action.payload.pin,
          },
          ...state.cart,
        ];
      } else {
        state.cart = [
          {
            vnumber: action.payload.vnumber,
            dname: action.payload.dname,
            dmobile: action.payload.dmobile,
            unit: action.payload.unit,
            amount: action.payload.amount,
            pin: action.payload.pin,
          },
        ];
      }
    },

    removedata: (state, action) => {
      state.cart = state.cart.filter(cart => cart.vnumber !== action.payload);

      console.log('removedata', state.cart);
    },
    removecartid: (state, action) => {
      state.cart = state.cart.filter(cart => cart !== action.payload);

      console.log('removecartid', state.addedtest);
    },
    emptycart: (state, action) => {
      state.cart = [];
      state.selectemp = null;
      state.selectempid = null;
      state.addedtest = [];
      console.log('removedata', state.cart);
    },
    cleardata: (state, action) => {
      ((state.Token = null), (state.user = null)),
        console.log('All data clear');
    },
  },
});

export const getToken = state => {
  return state.user.Token;
};
export const getCart = state => {
  return state.user.cart;
};
export const getCartlab = state => {
  return state.user.cartlab;
};
export const getUser = state => {
  return state.user.user;
};
export const getComment = state => {
  return state.user.comment;
};
export const getData = state => {
  return state.user.data;
};
export const getLike = state => {
  return state.user.like;
};
export const {
  setToken,
  setUser,
  setComment,
  cleardata,
  setLikes,
  setCart,
  removedata,
  removecartid,
  emptycart,
  setCartlab,
} = UserSlice.actions;

export default UserSlice.reducer;
