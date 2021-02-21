import React, { useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import todoContext from '../../context/todo/todoContext';
import authContext from '../../context/auth/authContext';
import TodoForm from "./todoForm.component";
import TodoItem from './todoItem.component';
import { MDBContainer, MDBRow } from 'mdbreact';
import "./todo.styles.css";
import shit from "../../images/notes.svg";

const Todo = (props) => {
    
    const TodoContext = useContext(todoContext);
    const { list, getList } = TodoContext;
    const AuthContext = useContext(authContext);
	const { logout } = AuthContext;

    const token = localStorage.getItem('token');

    useEffect(() => {
        console.log(token);
        if(token === null){
            props.history.push('/login');
        }
        getList(token);
        // eslint-disable-next-line
    }, [props.history]);

    const onLogout = () => {
		logout();
		window.location.href = "http://localhost:3000/login";
	}

    if (list === null) {
        return <h1>Loading</h1>
    }
    
    else if(list.length === 0){
        return (
            <MDBContainer fluid>
            <MDBRow style={{ marginTop: "20px", paddingLeft: "100px" }}>
                <div className="col-xs-12 col-sm-10 col-md-6 col-lg-4">
                    <TodoForm />
                </div>
            </MDBRow>
        </MDBContainer>
        )
    }

    return (
        <div className="todo-container">
            <MDBRow style={{ display: "flex", justifyContent: "space-between" }}>  
                <div className="col-xs-12 col-sm-10 col-md-6 col-lg-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div className="options">
                        <h3>Done ?</h3>
                        <button className="login-button transparent" onClick={onLogout}>Logout</button>
                    </div>
                    <TodoForm />
                    <div className="image-container">
                        <img src={shit} alt="gay" className="loser" />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-10 col-md-6 col-lg-6">
                    <div className="items">
                        {list.map(item => (
                            <CSSTransition key={item.id} classNames="item" timeout={500}>
                                <TodoItem item={item} />
                            </CSSTransition>
                        ))}
                    </div>
                </div>
            </MDBRow>
        </div>
    );
};

export default Todo;
