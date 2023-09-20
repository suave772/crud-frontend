import React, { useState, useEffect } from "react";
import "./App.css"
import axios from "axios";

function App() {
  const [accounts, setAccounts] = useState([ ]);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [selectedAccount, setSelectedAccount] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8000/accounts/fetch-create/', {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response)=>{
        setAccounts(response.data)
      }).catch((error)=>{
        console.log(error)
      })
  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addAccount = () => {
    if (formData.username && formData.password) {
      axios.post('http://localhost:8000/accounts/fetch-create/', formData, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response)=>{
        window.location.reload()
      }).catch((error)=>{
        console.log(error)
      })
      setFormData({ username: "", password: "" });
    }
  };

  const deleteAccount = (id) => {
    axios.delete(`http://localhost:8000/accounts/update-delete/${id}/`,  {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response)=>{
        window.location.reload()
      }).catch((error)=>{
        console.log(error)
      })
      setFormData({ username: "", password: "" });
    
  };

  const updateAccount = (id, updatedData) => {
    axios.patch(`http://localhost:8000/accounts/update-delete/${id}/`,  updatedData,{
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response)=>{
        window.location.reload()
      }).catch((error)=>{
        console.log(error)
      })
    console.log("data", updatedData)
    
  };

  return (
    <div className="App">
      <h1>Internet Café</h1>
      <div>
        <h2>Registered Accounts</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {accounts.length === 0 ? (
            <td>No accounts available</td>
            
          ) : (
            accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.username}</td>
                <td>{account.password}</td>
                <td>
                  <button onClick={() => deleteAccount(account.id)}>Delete</button>
                  <button
                    onClick={() => {
                      const newUsername = prompt("Enter new username:", account.username);
                      const newPassword = prompt("Enter new password:", account.password);
                      if (newUsername !== null || newPassword !== null) {
                        updateAccount(account.id, { username: newUsername, password: newPassword });
                      }
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
        <div>
          <h2>+ Add A New Account</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button onClick={addAccount}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;