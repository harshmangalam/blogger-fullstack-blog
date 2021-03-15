import NavMenu from "./NavMenu";

export default function NavLinks() {


	return (
			<>
			<NavMenu>Home</NavMenu>
			<NavMenu to="/about">About</NavMenu>
			<NavMenu to="/contact">Contact</NavMenu>
			
		</>
	);
}
