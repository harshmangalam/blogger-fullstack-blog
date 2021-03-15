import InputField from "../components/form/InputField"
import {Link,useHistory} from "react-router-dom"
import {useState} from "react"
import {useAppDispatch} from "../context"
import axios from "axios"


export default function CreatePost(){

	const history = useHistory()

	const appDispatch = useAppDispatch()

	const [title,setTitle] = useState("")
	const [body,setBody] = useState("")
	const [image,setImage] = useState("")
	const [loading,setLoading] = useState(false)

	const [error,setError] = useState({})

	const handleCreatePost = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios.post("/post/",{
				title,
				body,image
			})

			
			appDispatch("SNACKBAR",{success:true,msg:res.data.message})
			
			const postRes = await axios.get(`/post/${res.data.data.postId}`)
			console.log(postRes.data)
			appDispatch("ADD_POST",postRes.data)
			
			setLoading(false)
			history.push("/")
		} catch(e) {
			setLoading(false)
			console.log(e);
			if(e.response?.data){
				if(e.response.data.error){
					appDispatch("SNACKBAR",{success:false,msg:e.response.data.error})
				}
				setError(e.response.data)
			}
		}
	}

	return (

		<div className="max-w-md p-4 bg-white shadow-lg">
				<div className="mb-3">
					<h1 className="font-bold text-2xl text-center">Create Post</h1>
				</div>

				<form onSubmit={handleCreatePost}>
				<InputField value={title} handleChange={v=>setTitle(v)}  error={error.title} field="title" error="" label="Post Title"  required={true} />
				<InputField value={image} handleChange={v=>setImage(v)} field="image" label="Post Image URL" />
				<div>
			<label htmlFor="body" className="block text-gray-700">
				Post Body
			</label>

			<div className="my-2">
				<textarea id="body" onChange={e=>setBody(e.target.value)}  name="body" />
				<div className="text-red-600">
					{error.body}
				</div>
			</div>
		</div>
				<button className="w-full bg-blue-500 text-white text-lg my-3 py-2 rounded" type="submit">
{loading ? "Loading..." : "Create"}
				 </button>
				</form>

				
		</div>
		)
}