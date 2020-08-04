import React, { Component, useState } from "react";
import Notifications, { notify } from "../components/Notifications";
import axios from "axios";

function Admin (){
        const [registerUsername, setRegisterUsername]= useState("");
        const [registerPassword, setRegisterPassword]= useState("");
        const [loginUsername, setLoginUsername]= useState("");
        const [loginPassword, setLoginPassword]= useState("");
        const register = () => {
            axios({
                method: "POST",
                data:{
                    username: registerUsername,
                    password: registerPassword
                },
                withCredentials:true,
                url:"http://localhost:8080/api/users"
            }).then(res => {
                console.log(res);
            })
            


        }; 
        const login = () => {
            console.log("login")
            axios({
                method: "POST",
                data:{
                    email: loginUsername,
                    password: loginPassword
                },
                withCredentials:true,
                url:"http://localhost:8080/api/login"
            }).then(res => {
                console.log(res);
            })


        };
        const logout = () => {
            axios({
                method: "POST",                
                withCredentials:true,
                url:"http://localhost:8080/api/logout"
            }).then(res => {
                console.log(res);
            })
        }
        const getUser = () => {
            axios({
                method: "GET",
                data:{
                    username: registerUsername,
                    password: registerPassword
                },
                withCredentials:true,
                url:"http://localhost:8080/getUser"
            }).then(res => {
                console.log(res);
            })


        };
        return (
            <>
                <h1>Admin Page</h1>
                <div>
                    <h2>Register</h2>
                    <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)}></input>
                    <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)}></input>
                    <button onClick={register}>Submit</button>
                </div>
                <div>
                    <h2>Login</h2>
                    <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}></input>
                    <input placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
                    <button onClick={login}>Submit</button>
                </div>
                <div>
                    <h2>Get User</h2>
                    <button onClick={getUser}>Submit</button>
                </div>
                <button onClick={logout}>Logout</button>
                
                
                
            </>
        )
    


}

export default Admin;