import { Header } from "../Header";
import { SidePanel } from "../SidePanel";
import { EmailPanel } from "../EmailPanel";


export const DashboardPanel = () => {
	return (
		<div className="dashboard-panel" >
			<Header />
			<div className="dashboard-panel-content" >
				<SidePanel />
				<EmailPanel />
			</div>
		</div>
	);
}


export const Dashboard = () => {

	return (
		<DashboardPanel />
	);
}