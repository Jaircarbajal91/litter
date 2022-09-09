import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { getUserTweetsThunk } from '../store/tweets';
import { useDispatch } from 'react-redux';
import './UserList.css'

function UsersList({ sessionUser }) {
  const [users, setUsers] = useState([]);
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      if (sessionUser) {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
    }
    fetchData();
  }, []);


  const filteredUsers = users.filter(user => sessionUser.id !== user.id).slice(0, 5)
  const userComponents = filteredUsers.map((user) => {
    return (
      <div onClick={async () => {
        history.push(`/${user.username}`)
        }} className='other-users links' key={user.id}>
        <img className='profile-image user-list' src={user.profileImage} alt="" />
        <div className='tweet-name'>@{user.username}</div>
      </div>
    );
  });

  return (
    <div className='users-list container'>
      <h2>Say Meow to others!</h2>
      <div className='users-list wrapper'>{userComponents}</div>
    </div>
  );
}

export default UsersList;
