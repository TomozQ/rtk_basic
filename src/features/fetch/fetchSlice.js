import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const apiUrl = 'https://jsonplaceholder.typicode.com/users'

export const fetchAsyncGet = createAsyncThunk('fetch/get', async () => {
  const res = await axios.get(apiUrl)
  return res.data
})

const fetchSlice = createSlice({
  name: 'fetch',
  initialState: { users: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => { //addCase(fulfilled) -> 関数が正常に終了した場合の処理
      console.log("hoge")
      return {
        ...state,
        users: action.payload,  //action.payloadにはfetchAsyncget関数の戻り値(res.data)が入ってくる。
      }
    })
    builder.addCase(fetchAsyncGet.rejected, (err) => {
      console.log(err)
    })
  }
})

export const selectUsers = (state) => state.fetch.users

export default fetchSlice.reducer