import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Todo from "./components/todo/todo.component";
import Navbar from "./components/layout/navbar.component";
import Login from "./components/auth/login.component";
import Register from './components/auth/register.component';
import AuthState from "./context/auth/authState";
import TodoState from "./context/todo/todoState";

const App = () => {
	return (
		<AuthState>
			<TodoState>
				{/* <Navbar /> */}
				<Switch>
					<Route exact path="/" component={Todo} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</Switch>
			</TodoState>
		</AuthState>
	);
}

export default App;