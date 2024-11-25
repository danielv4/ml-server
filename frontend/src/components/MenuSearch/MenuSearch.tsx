import searchIcon from './search.png';

export const MenuSearch = () => {

	return (
		<div className="menu-search" >
			<div className="menu-search-img" >
				<img className="menu-search-im" src={searchIcon} />
			</div>
			<div className="menu-search-input" >
				<input className="menu-search-input-x" placeholder="Search" />
			</div>
		</div>
	);
}