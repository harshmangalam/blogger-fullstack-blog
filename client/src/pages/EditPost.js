import InputField from "../components/form/InputField"
import {Link,useHistory,useParams} from "react-router-dom"
import {useState,useEffect} from "react"
import {useAppDispatch} from "../context"
import axios from "axios"


export default function EditPost(){
	const params = useParams()
	

	const history = useHistory()

	const appDispatch = useAppDispatch()
	const [loading,setLoading] = useState(false)

	const [error,setError] = useState({})

	const [title,setTitle] = useState("")
	const [body,setBody] = useState("")
	const [image,setImage] = useState("")

	useEffect(()=>{


		async function fetchPost(){
			setLoading(true)
			try {
				const res = await axios.get(`/post/${params.postId}`)
				setTitle(res.data?.title)
				setBody(res.data?.body)
				setImage(res.data?.image)

				setLoading(false)
			} catch(e) {
				setLoading(false)
				console.log(e);
				if(e.response.data.error){
					appDispatch("SNACKBAR",{success:false,msg:e.response.data.error})
				}
			}
		}	

		fetchPost()
	},[params])

	



	

	const handleEditPost = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios.put(`/post/${params.postId}`,{
				title,
				body,
				image,
			})

			
			appDispatch("SNACKBAR",{success:true,msg:res.data.message})
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
					<h1 className="font-bold text-2xl text-center">Edit Post</h1>
				</div>
				{loading ? <p>Loading...</p> : 
				<form onSubmit={handleEditPost}>
				<InputField value={title} handleChange={v=>setTitle(v)}  error={error.title} field="title" error="" label="Post Title"  required={true} />
				<InputField value={image} handleChange={v=>setImage(v)} field="image" label="Post Image URL" />
				<div>
			<label htmlFor="body" className="block text-gray-700">
				Post Body
			</label>

			<div className="my-2">
				<textarea id="body" value={body} onChange={e=>setBody(e.target.value)}  name="body" />
				<div className="text-red-600">
					{error.body}
				</div>
			</div>
		</div>
				<button className="w-full bg-blue-500 text-white text-lg my-3 py-2 rounded" type="submit">
{loading ? "Loading..." : "Edit"}
				 </button>
				</form>}

				
		</div>
		)
}