import UserProfile from "../components/profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import ProfileLoader from "../components/profile/ProfileLoader"
import PostLoader from "../components/post/PostLoader"
import PostCard from "../components/post/PostCard"

export default function Profile() {
	const [user, setUser] = useState(null);
	const params = useParams();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchUser() {
			const userId = params.userId;
			try {
				const response = await axios.get(`/user/${userId}`);
				setUser(response.data);
			} catch (e) {
				// statements
				console.log(e);
			} finally {
				setLoading(false)
			}
		}
		fetchUser();
	}, [params]);

	if (loading) {
		return (
			<div>
			<ProfileLoader />

			<hr />
			<PostLoader />
			</div>
			)
	}
	return (
		<div>
		<div className="max-w-md m-auto">
			
			{user ? (
				
				<UserProfile user={user} loading={loading} />
				
			) : (
				<div>User not Found</div>
			)}

		</div>

		<hr />

		<div className="my-3 text-xl text-center font-bold text-blue-500">Posts</div>

		<div>
{user?.posts?.length > 0 ? user.posts.map(post=><div className="my-4"><PostCard post={{...post,user:user.user}} /></div>) : <p>No Post</p>}
		</div>
		</div>
	);
}
