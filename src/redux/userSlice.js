import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'



export const login = createAsyncThunk('user/login',async({email, password})=>{
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth,email,password)

        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;

        const userData ={
            token,
            user: user,
        }
        return userData
    } catch (error) {
        console.log("userSlice 21 line:",error)
        throw error
    }
})

export const register = createAsyncThunk('user/register', async({email,password})=>{
    try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(auth,email,password)

        const user = userCredential.user
        const token = userCredential.stsTokenManager.accessToken

        await AsyncStorage.setItem("userToken",token)
    } catch (error) {
        throw error
    }
})

const initialState={
    isLoading: false,
    isAuth: false,
    token: null,
    user: null,
    error: null
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setEmail: (state, action)=>{
            state.email = action.payload
        },
        setPassword: (state, action)=>{
            state.password = action.payload
        },
        setIsLoading: (state, action)=>{
            state.isLoading = action.payload
        },


    },
    extraReducers: (builder) =>{
        builder
        .addCase(login.pending, (state)=>{
            state.isLoading = true;
            state.isAuth = false;
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.isLoading= false;
            state.isAuth = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(login.rejected, (state,action)=>{
            state.isLoading = false;
            state.isAuth = false;
            state.error = action.error.message;
        })
        .addCase(register.pending, (state)=>{
            state.isLoading = true;
            state.isAuth = false;
        })
        .addCase(register.fulfilled, (state,action)=>{
            state.isLoading= false;
            state.isAuth = true;
            state.user = action.payload;
        })
        .addCase(register.rejected, (state,action)=>{
            state.isLoading = false;
            state.isAuth = false;
            state.error = "Incalid Email or Password"
        })
    }
})



export const {setEmail,setPassword,setIsLoading } = userSlice.actions;
export default userSlice.reducer;
