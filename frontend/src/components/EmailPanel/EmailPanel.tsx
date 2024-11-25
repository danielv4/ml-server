import reloadIcon from './reload.png';
import arrowDownIcon from './arrow_down.png';
import arrowRightIcon from './arrow_right.png';
import arrowLeftIcon from './arrow_left.png';
import settings from './settings.png';
import promotionsIcon from './promotions.png';
import socialIcon from './social.png';
import updatesIcon from './updates.png';
import inboxIcon from './inbox.png';
import { useEffect, useState } from 'react';
import starIcon from './star.png';
import { listEmails } from '../../client';


export const prettyDate = (unixTimestamp) => {
	const date:any = new Date(unixTimestamp * 1000); // Convert to milliseconds

	const now:any = new Date();
	const diffMs:any = now - date;

	const diffMins = Math.floor(diffMs / 60000);
	const diffSecs = Math.floor(diffMs / 1000) % 60;

	if (diffMins < 1) {
		return `${diffSecs} second${diffSecs > 1 ? 's' : ''} ago`;
	} else if (diffMins < 60) {
		return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
	} else {
		const options = { month: 'short', day: 'numeric' };
		return date.toLocaleDateString(undefined, options);
	}
};

export const getNameByID = (id) => {

	if (id == "1") {
		return "job seekers";
	} else if (id == "2") {
		return "sales calls";
	} else if (id == "3") {
		return "customer complaints";
	} else if (id == "4") {
		return "business proposals";
	} else if (id == "5") {
		return "other";
	} else {
		return "other";
	}
};

export const MenuTools = () => {
	return (
		<div className="menu-tools" >
			<div className="menu-tools-x" >
				<div className="menu-tools-a1" >
					<div className="menu-tools-select" >
						<div className="menu-tools-select-all" >
							<div className="menu-tools-select-all-im" ></div>
						</div>
						<div className="menu-tools-select-img" >
							<img className="menu-tools-select-im" src={arrowDownIcon} />
						</div>
					</div>
					<div className="menu-tools-reload-img" >
						<img className="menu-tools-reload-im" src={reloadIcon} />
					</div>
					<div className="menu-tools-reload-btn" >
						<div className="menu-tools-reload-btn-x" >
							<div className="menu-tools-reload-btn-a1" ></div>
							<div className="menu-tools-reload-btn-a1" ></div>
							<div className="menu-tools-reload-btn-a1" ></div>
						</div>
					</div>
				</div>

				<div className="menu-tools-a2" >
					<div className="menu-tools-page-text" >1 - 10 of 1</div>
					<div className="menu-tools-arrows" >
						<div className="menu-tools-arrow-img" >
							<img className="menu-tools-arrow-im" src={arrowLeftIcon} />
						</div>
						<div className="menu-tools-arrow-img" >
							<img className="menu-tools-arrow-im" src={arrowRightIcon} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


export const Tab = (props) => {
	return (
		<div className={props.selected ? "menu-tab-selected" : "menu-tab"} >
			<div className="menu-tab-img" >
				<img className="menu-tab-im" src={props.icon} />
			</div>
			<div className="menu-tab-text" >{props.text}</div>
		</div>
	);
}

export const Tabs = () => {
	return (
		<div className="menu-tabs" >
			<Tab selected={true} text="Inbox" icon={inboxIcon} />
			<Tab text="Social" icon={socialIcon} />
			<Tab text="Promotions" icon={promotionsIcon} />
			<Tab text="Updates" icon={updatesIcon} />
		</div>
	);
}


export const Email = (props) => {
	return (
		<div className="menu-email-item" >
			<div className="menu-email-item-check-box" >
				<div className="menu-email-item-check-box-x" ></div>
			</div>
			<div className="menu-email-item-star" >
				<img className="menu-email-item-star-im" src={starIcon} />
			</div>
			<div className="menu-email-item-name" >{props?.item.sender}</div>
			<div className="menu-email-item-type" >
				<div className="menu-email-item-type-x" >{getNameByID(props?.item.ai_type)}</div>
			</div>
			<div className="menu-email-item-subject" >{props?.item.subject}</div>
			<div className="menu-email-item-text" >{props?.item.content}</div>
			<div className="menu-email-item-timestamp" >{prettyDate(props?.item.timestamp)}</div>
		</div>
	);
}


export const Emails = () => {

	const [emails, setEmails] = useState<any>([]);

	useEffect(() => {
		listEmails(function(r, err) {
			if(err) {
				console.log(err);
			}
			console.log(r);
			setEmails(r?.emails);
		});
	}, []);

	return (
		<div className="menu-emails" >
			{emails?.map((item, key) => {
				return (
					<Email key={key} item={item} />
				);
			})}
		</div>
	);
}


export const EmailPanel = () => {

	return (
		<div className="email-panel" >
			<MenuTools />
			<Tabs />
			<Emails />
		</div>
	);
}