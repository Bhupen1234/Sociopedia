import { createSlice } from "@reduxjs/toolkit";


const intialState ={
    mode :"light",
    user : {firstName :"Bhupendra", lastName : "Nasare"},
    token : null,
    posts : []
}


export const authSlice = createSlice({
    name: "auth",
    intialState,
    reducers :{
        setMode :(state)=>{
            state.mode = state.mode==="light" ? "dark" : "light"
        },
        setLogin :(state,action) =>{
            state.user= action.payload.user;
            state.token=action.payload.token;
        },

        setLogout :(state,action) =>{
            state.user= null;
            state.token=null;
        },

        setFriends :(state,action)=>{
          if(state.user){
            state.user.friends=action.payload.friends
          }
          else{
            console.log("user firnd non-existent")
          }
        },

        setPosts:(state,action)=>{
            state.posts= action.payload.posts;
        },
        setPost:(state,action)=>{
            const updatedPosts= state.posts.map((post)=>{
                if(post._id===action.payload.post_id) return action.payload.post;
                return post;
            })
            state.post=updatedPosts;
        }
    }
})

export const {setmode,setLogin,setLogout,setFriends,setPosts,setPost}= authSlice.actions;
export default authSlice.reducer;