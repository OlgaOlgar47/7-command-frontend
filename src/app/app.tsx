import styles from './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/login';
import { EmployeeRatingPage } from '../pages/employee-rating/employee-rating';
import users from '../shared/utils/users';

function App() {
	return (
		<div className={styles.container__main}>
			<Routes>
				<Route path="/7-command-frontend" element={<Login users={users} />} />
				<Route path="/7-command-frontend/head" element={<></>} />
				<Route path="/7-command-frontend/employee" element={<></>} />
				<Route
					path="/7-command-frontend/mentor"
					element={<EmployeeRatingPage />}
				/>
				<Route path="/*" element={<></>} />
			</Routes>
		</div>
	);
}

export default App;
