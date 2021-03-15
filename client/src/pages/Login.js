import InputField from "../components/form/InputField"
import {Link,useHistory} from "react-router-dom"
import {useState} from "react"
import {useAppDispatch} from "../context"
import axios from "axios"
export default function Login(){
	const history = useHistory()

	const appDispatch = useAppDispatch()

	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	const [loading,setLoading] = useState(false)

	const [error,setError] = useState({})

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios.post("/auth/login",{
				email,
				password
			})

			window.localStorage.setItem("token",res.data.data.token)
			appDispatch("SNACKBAR",{success:true,msg:res.data.message})
			
			const userRes = await axios.get("/user/me",{
				headers:{
					"Authorization":`Bearer ${res.data.data.token}`
				}
			})
			appDispatch("AUTH",userRes.data)
			
			history.push("/")
		} catch(e) {
			console.log(e);
			if(e.response?.data){
				if(e.response.data.error){
					appDispatch("SNACKBAR",{success:false,msg:e.response.data.error})
				}
				setError(e.response.data)
			}
		}finally{
			setLoading(false)
		}
	}

	return (

		<div className="max-w-md m-auto p-4 bg-white shadow-lg">
				<div className="my-6">
					<h1 className="font-bold text-2xl text-center">Login</h1>
				</div>

				<form onSubmit={handleLogin}>
				<InputField value={email} handleChange={(v)=>setEmail(v)} field="email" error={error.email} label="Email Address" type="email" autocomplete="email" required={true} />
				<InputField value={password} handleChange={(v)=>setPassword(v)} field="password" error={error.password} label="Password" type="password" required={true} />
				<button disabled={loading} className="w-full bg-blue-500 text-white text-lg my-3 py-2 rounded" type="submit">
					{loading ? "Loading...":"Login"}
				 </button>
					
				</form>

				<div className="my-2">
					<Link to="/register">
					<p className="text-blue-600 text-sm text-center">Create New Account</p>
					</Link>
				</div>
		</div>
		)
}