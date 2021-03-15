export default function PostFooter({likeCount}){
	return (
<div className="w-full  px-2 py-2 bg-white">
		<button className="bg-blue-500 text-white flex items-center justify-center space-x-2 py-1 px-3">
			<div>
				Likes
			</div>
			<div>
			{likeCount}
			</div>
		</button>
</div>
		)
}