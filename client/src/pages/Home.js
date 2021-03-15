import PostCard from "../components/post/PostCard";
import Profile from "../components/profile"
import ProfileLoader from "../components/profile/ProfileLoader"
import PostLoader from "../components/post/PostLoader"
import {useAppState,useAppDispatch} from "../context"
import axios from "axios"
import {useEffect,useState} from "react"
export default function Home() {
	const {currentUser,loading,posts} = useAppState()
	const appDispatch = useAppDispatch()

	const [loadingPosts,setLoadingPosts] = useState(true)
	useEffect(()=>{
		async function loadPosts(){
			try {
				const res = await axios.get("/post/")
				appDispatch("ADD_POSTS",res.data)
			} catch(e) {
				console.log(e);
			}finally{
				setLoadingPosts(false)
			}
		}

		loadPosts()
	},[])
	return (
		<div className="grid grid-col-1  md:grid-cols-2 gap-3 items-start">
			<div>
				{loadingPosts ? <PostLoader /> : posts.length > 0 ? posts.map((post) => (
					<div className="my-4">
						<PostCard post={post} />
					</div>
				)):<p>No Posts</p>}
			</div>

			<div className="hidden md:block">
			{loading  ? <ProfileLoader /> : <Profile  user={currentUser}/>}
			</div>
		</div>
	);
}


// 	{
// 		_id: "12qw3tvd1",
// 		body: "This is a post body.Awesome Building touching the sky",
// 		likeCount: 20,
// 		title: "Building on the top of sky ",
// 		createdAt: 1615523228786,
// 		image:
// 			"https://images.unsplash.com/photo-1615396662271-e313de4da9ff?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
// 		user: {
// 			name: "Harsh Mangalam",
// 			profilePic:
// 				"https://images.unsplash.com/photo-1615396662271-e313de4da9ff?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
// 		},
// 	},
