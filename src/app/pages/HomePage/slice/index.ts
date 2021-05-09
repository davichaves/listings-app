import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, Listing } from './types';

export const emptyListing = {
  overview: {},
  facts: {},
  others: {},
  visits: {},
  homeImage: '',
  images: [],
};

// The initial state of the HomePage container
export const initialState: ContainerState = {
  listings: [],
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setListings(state, action: PayloadAction<Listing[]>) {
      state.listings = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = homePageSlice;
