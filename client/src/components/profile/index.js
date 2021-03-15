export default function Profile({user}) {
	const handleLogout = () => {
		window.localStorage.removeItem("token")
		window.location.reload()
	}
	return (
		<>
			<div className="my-4 p-4 bg-white rounded-lg shadow ">
				{user ? <div className="flex flex-col md:flex-row space-x-3  ">
									<div className="md:w-14 md:h-14  w-full h-60 flex-shrink-0">
										<img
											className="w-full h-full md:rounded-full"
											src="https://images.unsplash.com/photo-1615396662271-e313de4da9ff?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
										/>
									</div>
									<div className="flex flex-col space-y-2">
										<h3 className="text-xl text-blue-600 font-bold">
											{user.user.name}
										</h3>
										<div className="flex items-center space-x-3">
											<span>Email</span>
											<span className="truncate md:w-40 lg:w-60">{user.user.email}</span>
										</div>
										<div className="flex items-center space-x-3">
											<span>Posts</span>
											<span>{user.posts?.length}</span>
										</div>
				
										<div className="flex items-center space-x-3">
											<span>Joined</span>
											<span>{user.user.createdAt}</span>
										</div>
				
										<div className="my-3">
											<button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded-lg text-white text-lg font-semibold">
												Logout
											</button>
										</div>
									</div>
								</div> : 
								<div className="flex flex-col items-center space-y-4 text-xl text-blue-600">
									<img src="/logo512.png" className="w-24 h-24 rounded-full" />
									<p>Login to create Post</p>
								</div>
							}
			</div>
		</>
	);
}
