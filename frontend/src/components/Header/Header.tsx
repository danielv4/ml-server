import { MenuButton } from "../MenuButton";
import { MenuText } from "../MenuText";
import { MenuSearch } from "../MenuSearch";
import { MenuUser } from "../MenuUser";

export const Header = () => {

	return (
		<div className="header" >
			<div className="header-x" >
				<div className="header-item-title" >
					<MenuButton />
					<MenuText />
				</div>
				<div className="header-item-search" >
					<MenuSearch />
				</div>
				<div className="header-item-user" >
					<MenuUser />
				</div>
			</div>
		</div>
	);
}