import InputField from "../components/form/InputField";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../context";
import axios from "axios";

import PostLoader from "../components/post/PostLoader";

export default function Post() {
	const params = useParams();
	const appDispatch = useAppDispatch();

	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState({});

	useEffect(() => {
		async function fetchPost() {
			setLoading(true);
			try {
				const res = await axios.get(`/post/${params.postId}`);
				setPost(res.data);

				setLoading(false);
			} catch (e) {
				setLoading(false);
				console.log(e);
				if (e.response.data.error) {
					appDispatch("SNACKBAR", {
						success: false,
						msg: e.response.data.error,
					});
				}
			}
		}

		fetchPost();
	}, [params]);

	if (loading) {
		return (<div>

				<div className="my-4 p-4 bg-white rounded-lg shadow w-full">
				<div className="animate-pulse flex items-center space-x-4">
					<div className="rounded-full bg-blue-300 h-12 w-12"></div>
					<div className="flex-1 space-y-4 py-1">
						<div className="h-4 bg-blue-300 rounded w-40"></div>
						
					</div>
					
				</div>
				<div className="space-y-2 flex flex-col space-y-4 my-2">
							<div className="h-96 bg-blue-300 rounded w-full"></div>
							<div className="h-4 bg-blue-300 rounded w-60"></div>
							<div className="h-4 bg-blue-300 rounded w-60"></div>
							
						</div>
			</div>

		</div>)
	}

	if(!post){
		return <p>....</p>
	}
	return (
		<div >
<h1 className="text-5xl text-center">{post.title}</h1>
<div className="flex items-center space-x-4 justify-center my-4">
	<img src={post.user?.image} className="w-14 h-14 rounded-full" />
	<div>
	<p className="text-sm text-gray-700">{post.user.name}</p>
	<p className="text-sm text-gray-700">{post.user.email}</p>
	</div>
</div>

<div>
	{post.image && <img src={post.image} className="w-full h-96  rounded-xl" />}
		<p className="text-center my-2 text-xl text-gray-800">{new Date(post.createdAt).toDateString()}</p>
	{post.body && <p className="text-lg text-justify my-4 px-6">{post.body}</p>}
</div>
		</div>
	)
}
