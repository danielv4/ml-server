import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  code: "en",
};

const setTranslateDataState = (state, action: PayloadAction<any>) => {
  state.data = action.payload;
};

const slice = createSlice({
  name: 'translateData',
  initialState,
  reducers: {
    setTranslateData: setTranslateDataState,
  },
});

export const { setTranslateData } = slice.actions;

export default slice.reducer;