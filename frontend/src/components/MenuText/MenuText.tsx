import menuIcon from './icon.png';

export const MenuText = () => {

	return (
		<div className="menu-text" >
			<div className="menu-text-img" >
				<img className="menu-text-im" src={menuIcon} />
			</div>
			<div className="menu-text-data" >CodeAI</div>
		</div>
	);
}