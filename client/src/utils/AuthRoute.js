import {Redirect} from "react-router-dom"
import {useEffect,useState} from "react"

import {useAppDispatch,useAppState} from "../context.js"

const AuthRoute = ({children}) => {

	const {loading,currentUser} = useAppState()

	if(loading){
		return <h1>Loading...</h1>
	}
	if(!currentUser){
		return <Redirect to={{pathname:"/"}} />
	}

	return <>{children}</>
}

export default AuthRoute