import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit"
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY_FAVORITE_USERS = 'favorite-users'

const initialState = {
    users: [],
    favoriteUsers: []
}

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async (numberOfUser: number) => {
      const response = await fetch(`https://randomuser.me/api/?results=${numberOfUser}`)
      return response.json()
  }
)

export const fetchFavoriteUsers = createAsyncThunk(
  'favorite-users/load',
  async () => {
    try {
      const favoriteUsers = await AsyncStorage.getItem(KEY_FAVORITE_USERS)
      if(favoriteUsers !== null) {
        return JSON.parse(favoriteUsers)
      }
    } catch(e) {
      return []
    }
  }
)

export const saveFavoriteUsers = createAsyncThunk(
  'favorite-users/save',
  async (_, { getState }) => {
    const state: any = getState()
    console.log("🚀 ~ file: user.reducer.ts ~ line 38 ~ state", state)
    try {
      await AsyncStorage.setItem(KEY_FAVORITE_USERS, JSON.stringify(state?.favoriteUsers ?? []))
    } catch(e) {
      console.error(e)
    }
  }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      addToFavorite (state, action) {
        const { payload } = action
        state.favoriteUsers = [...state?.favoriteUsers, payload]
      },
      removeFavorite (state, action) {
        const { payload } = action
        state.favoriteUsers = state.favoriteUsers.filter(favoriteUser => favoriteUser?.login?.uuid !== payload?.login?.uuid)
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action?.payload?.results ?? []
      }),
      builder.addCase(fetchFavoriteUsers.fulfilled, (state, action) => {
        state.favoriteUsers = action?.payload ?? []
      })
    }
})

export const { addToFavorite, removeFavorite } = userSlice.actions

export const users = (state) => state?.user?.users
export const favoriteUsers = (state) => state?.user?.favoriteUsers

export default userSlice.reducer