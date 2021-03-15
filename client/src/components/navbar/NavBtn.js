import {NavLink} from "react-router-dom"

export default function NavBtn({ children, bg = "blue", color = "white" ,to="/"}) {
	return (
		<NavLink to={to}>
			<button

			className={`rounded px-3 py-1 hover:bg-${bg}-600 font-semibold focus:outline-none focus:ring-2 focus:ring-${bg}-500 bg-${bg}-500 text-${bg}-100`}
		>
			{children}
		</button>
		</NavLink>
	);
}
