import InputField from "../components/form/InputField"
import {Link,useHistory} from "react-router-dom"
import {useState} from "react"
import {useAppDispatch} from "../context"
import axios from "axios"


export default function Register() {

const appDispatch = useAppDispatch()
	const history = useHistory()


	const [email,setEmail] = useState("")
	const [name,setName] = useState("")
	const [password,setPassword] = useState("")
	const [loading,setLoading] = useState(false)

	const [error,setError] = useState({})

	const handleRegister = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios.post("/auth/register",{
				name,
				email,
				password
			})

			appDispatch("SNACKBAR",{success:true,msg:res.data.message})
			
			history.push("/login")
		} catch(e) {

			console.log(e);
			if(e.response?.data){
				if(e.response.data.error){
					if(e.response.data.error){
					appDispatch("SNACKBAR",{success:false,msg:e.response.data.error})
				}
					appDispatch("SNACKBAR",{success:false,msg:e.response.data.error})
				}
				setError(e.response.data)
			}
		}finally{
			setLoading(false)
		}
	}
	return (
		<div className="max-w-md m-auto p-4 shadow-lg bg-white">
			<div className="my-6">
				<h1 className="font-bold text-2xl text-center">Signup</h1>
			</div>

			<form onSubmit={handleRegister}>
				<InputField value={name}
					error={error.name}
					handleChange={(v)=>setName(v)} field="name" label="Name" required={true} />
				<InputField
					field="email"
					label="Email Address"
					type="email"
					autocomplete="email"
					value={email}
					handleChange={(v)=>setEmail(v)}
					required={true}
					error={error.email}
				/>
				<InputField
					field="password"
					label="Password"
					type="password"
					required={true}
					value={password}
					handleChange={(v)=>setPassword(v)}
					error={error.password}
				/>
				<button
					className="w-full bg-blue-500 text-white text-lg my-3 py-2 rounded"
					type="submit"
				>
					Signup
				</button>
			</form>

			<div className="my-2">
				<Link to="/login">
					<p className="text-blue-600 text-sm text-center">
						Already have an account
					</p>
				</Link>
			</div>
		</div>
	);
}
