import { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import NavBtn from "./NavBtn";
import {useAppState,useAppDispatch} from "../../context"

export default function Navbar() {
	const [show, setShow] = useState(false);

	const {authenticated,currentUser,snackbar} = useAppState()
	const appDispatch = useAppDispatch()

	const links = authenticated ? <>

<NavBtn bg="blue" to={`/user/${currentUser.user._id}`}>
											Profile
										</NavBtn>
										<NavBtn bg="green" to={`/post/create`}>
											Create Post
										</NavBtn>
										

						</> : <>
<NavBtn bg="purple" to="/login">
											Login
										</NavBtn>
										<NavBtn bg="yellow" to="/register">
											Signup
										</NavBtn>
										</>
									

	return (
		<div>
			<div className="items-center justify-between h-14 px-12 bg-white shadow  w-full hidden md:flex">
				<Logo />
				<div className={`md:flex items-center space-x-4 hidden`}>
					<NavLinks show={show} setShow={setShow} />
				</div>

				<div className={`md:flex items-center space-x-4 hidden`}>
					{links}
				</div>
			</div>
			<div className="md:hidden  items-center justify-between h-14 px-4 bg-white shadow  w-full flex">
				<Logo />
				<div
					className="md:hidden cursor-pointer "
					onClick={() => setShow(!show)}
				>
					<MdMenu size="30px" />
				</div>
			</div>


			{show && (
				<>
				<div className="z-40 absolute  t-0 l-0 r-0 z-20 bg-transparent text-white w-full md:hidden flex justify-between px-3 py-4">
					<div>
						<NavLinks />
						{links}
					</div>
					<MdClose size="30px" onClick={() => setShow(false)} />
				</div>
				<div className="md:hidden absolute t-0 l-0 r-0 h-screen  w-screen bg-gray-200" />
				</>
			)}

			{snackbar && <div className={`flex px-2 md:px-10 items-center justify-between bg-${snackbar.success ? "green-500" : "red-500"} text-white py-3 w-full`}>
							<p>{snackbar.msg}</p>
							<MdClose onClick={()=>appDispatch("SNACKBAR",null)} className="cursor-pointer" size="30px" />
						</div>}

		</div>

	);
}
