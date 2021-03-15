import PostHeader from "./PostHeader"
import PostBody from "./PostBody"
import PostFooter from "./PostFooter"


export default function PostCard({post}){

	return (

		
			<div className="shadow hover:shadow-lg">

				<PostHeader post={post} />
				<PostBody post={post} />
				

		</div>
		
		)
}