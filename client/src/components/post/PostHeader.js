import {MdEdit,MdDelete} from "react-icons/md"
import {useAppState,useAppDispatch} from "../../context"
import {Link} from "react-router-dom"
import axios from "axios"

export default function PostHeader({post}) {
	const {currentUser,authenticated} = useAppState()
	const appDispatch  = useAppDispatch()

	
	const handlePostDelete = async (id) => {
		try{
			const res = await axios.delete(`/post/${id}`)
			appDispatch("SNACKBAR",{success:true,msg:res.data.message})
			appDispatch("DELETE_POST",id)

		}catch(err){
			console.log(err)
			if(err.response.data.error){
				appDispatch("SNACKBAR",{success:false,msg:err.response.data.error})
			}

		}
	}
	return (
		<div className="h-12 px-2 w-full bg-white py-2 flex items-center justify-between space-x-2 px-1">
			<div className="flex items-center space-x-2 w-full">
			<div className="w-8 h-8">
				<img className="rounded-full w-full h-full" src={post?.user?.image} />
				
			</div>
			<h1>
				{post?.user.name}
			</h1>
			</div>
			{authenticated ? currentUser.user._id == post.user._id && <div className="flex items-center space-x-2">
							<MdDelete className="cursor-pointer" onClick={()=>handlePostDelete(post._id)} size="20px" />
							<Link to={`/post/edit/${post._id}`}><MdEdit className="cursor-pointer" size="20px" /></Link>
						</div> : null}
		</div>
	);
}
