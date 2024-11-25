import fullscreenIcon from './fullscreen.png';
import closeIcon from './close.png';
import { useState } from 'react';
import { sendEmail } from '../../client'; 

export const Compose = () => {

	const [toAddress, setToAddress] = useState<any>();
	const [subject, setSubject] = useState<any>();
	const [message, setMessage] = useState<any>();

	const onToAddress = (e) => {
		setToAddress(e.target.value);
	};

	const onSubject = (e) => {
		setSubject(e.target.value);
	};

	const onMessage = (e) => {
		setMessage(e.target.value);
	};

	const onSend = (e) => {

		var data = {
			"receiver_email": toAddress,
			"subject": subject,
			"message": message,
		};

		sendEmail(data, function(r, err) {
			if(err) {
				console.log(err);
			}
			console.log(r);
		});
	};

	return (
		<div className="compose-panel" >

			<div className="compose-panel-header" >
				<div className="compose-panel-text" >New Message</div>
				<div className="compose-panel-header-x" >
					<div className="compose-panel-minimize" >
						<div className="compose-panel-minimize-x" ></div>
					</div>
					<div className="compose-panel-fullscreen" >
						<img className="compose-panel-fullscreen-x" src={fullscreenIcon} />
					</div>
					<div className="compose-panel-close" >
						<img className="compose-panel-close-x" src={closeIcon} />
					</div>
				</div>
			</div>

			<div className="compose-panel-to" >
				<input className="compose-panel-to-input" onChange={onToAddress} placeholder="To" />
			</div>

			<div className="compose-panel-subject" >
				<input className="compose-panel-subject-input" onChange={onSubject} placeholder="Subject" />
			</div>

			<div className="compose-panel-content" >
				<textarea className="compose-panel-content-input" onChange={onMessage} />
			</div>

			<div className="compose-panel-buttons" onClick={onSend} >
				<div className="compose-panel-btn-x1" >Send</div>
			</div>
		</div>
	);
}