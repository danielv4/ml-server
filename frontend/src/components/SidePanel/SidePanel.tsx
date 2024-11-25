import inboxIcon from './inbox.png';
import starredIcon from './starred.png';
import snoozedIcon from './snoozed.png';
import sentIcon from './sent.png';
import draftsIcon from './drafts.png';
import writeIcon from './write.png';

export const Compose = () => {
	return (
		<div className="side-panel-compose" >
			<div className="side-panel-compose-img" >
				<img className="side-panel-compose-im" src={writeIcon} />
			</div>
			<div className="side-panel-compose-text" >Compose</div>
		</div>
	);
}


export const Button = (props) => {

	return (
		<div className={props.selected ? "side-panel-button-selected" : "side-panel-button"} >
			<div className="side-panel-button-img" >
				<img className="side-panel-button-im" src={props.icon} />
			</div>
			<div className="side-panel-button-text" >{props.text}</div>
		</div>
	);
}


export const SidePanel = () => {

	return (
		<div className="side-panel" >
			<div className="side-panel-x" >
				<Compose />
				<Button selected={true} icon={inboxIcon} text="Inbox" />
				<Button icon={starredIcon} text="Starred" />
				<Button icon={snoozedIcon} text="Snoozed" />
				<Button icon={sentIcon} text="Sent" />
				<Button icon={draftsIcon} text="Drafts" />
			</div>
		</div>
	);
}