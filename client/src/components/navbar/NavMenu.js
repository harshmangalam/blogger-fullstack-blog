import {NavLink} from "react-router-dom"
export default function NavMenu({children,to="/"}){

	return (

		<NavLink to={to}>
			<div className="text-purple-700 hover:bg-purple-100 px-3 py-2">
				{children}
			</div>
		</NavLink>

		)
}