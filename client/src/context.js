import { createContext, useContext,useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
	authenticated: false,
	currentUser: null,
	loading: false,
	snackbar:null,
	posts:[],
};

const StateContext = createContext(initialState);

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
	switch (type) {
		case "AUTH":
			return {
				...state,
				authenticated: true,
				currentUser: payload,
			};

		case "LOGOUT":
			return {
				...state,
				authenticated: false,
				currentUser: null,
			};

		case "LOADING":
			return {
				...state,
				loading: payload,
			};

		case "SNACKBAR":
			return {
				...state,
				snackbar:payload
			}

		case "ADD_POST":
			return {
				...state,
				posts:[payload,...state.posts]
			}
		case "ADD_POSTS":
		return {

			...state,
			posts:payload
		}

		case "DELETE_POST":
			let new_posts = state.posts.filter(post=>post._id != payload)
			return {
				...state,
				posts:new_posts
			}

		default:
			throw new Error("Unknown action");
	}
};


export const AppProvider = ({children}) => {
	const [state,defaultDispatch] = useReducer(reducer,initialState)


const dispatch = (type,payload) => defaultDispatch({type,payload})



	useEffect(()=>{
		const token = window.localStorage.token
		async function checkAuth(){
			if(token){
				try {
				const res = await axios.get("/user/me")
				dispatch("AUTH",res.data)
			} catch(e) {
				
				console.log(e);
				
			}finally{
				dispatch("LOADING",false)
			}
			}
		}

		checkAuth()
	},[])

return (

	<DispatchContext.Provider value={dispatch}>
		<StateContext.Provider value={state}>
				{children}
		</StateContext.Provider>	
	</DispatchContext.Provider>
	)

}


export const useAppState = () => useContext(StateContext)
export const useAppDispatch = () => useContext(DispatchContext)
