import {Link} from "react-router-dom"
export default function PostBody({post}) {
	
	return (
		<div className="bg-white">
			{post?.image && <div className="w-full h-96">
				<img src={post?.image} className="w-full h-full" />
				</div>}
			<div className="px-2 py-3">
<h2 className="text-xl text-gray-600">{post.title}</h2>

			<p className="text-justify py-3">{post?.body}</p>

			<p className="text-gray-600 text-sm">
				{new Date(post?.createdAt).toDateString()}
			</p>

			<div>
				<Link to={`/post/view/${post?._id}`}>
					<p className="text-sm text-blue-600 hover:bg-blue-500 hover:text-white text-center p-1 mt-3">View</p>
				</Link>
			</div>	
			</div>
		</div>
	);
}
