import React, { useState } from 'react';
import gridImg from '../Assets/gridview.png';
import Activelistview from '../Assets/Activelistview.png';
import user1 from '../Assets/user1.png';
import user2 from '../Assets/user2.png';
import user3 from '../Assets/user3.png';
import user4 from '../Assets/user4.png';
import user5 from '../Assets/user5.png';
import user6 from '../Assets/user6.png';
// Initial list of users
const initialUsers = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@gmail.com', profilePic: user1 },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@gmail.com', profilePic: user2 },
  { id: 3, firstName: 'Doe', lastName: 'Smith', email: 'doe@gmail.com', profilePic: user3 },
  { id: 4, firstName: 'Charlie', lastName: 'Smith', email: 'charlie@gmail.com', profilePic: user4 },
  { id: 5, firstName: 'Ayan', lastName: 'Smith', email: 'ayan@gmail.com', profilePic: user5 },
  { id: 6, firstName: 'Adnan', lastName: 'Smith', email: 'adnan@gmail.com', profilePic: user6 }
];

const Home = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isGridView, setIsGridView] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', profilePic: '' });

  // Toggle between grid and list view
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  // Delete a user by ID
  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Handle input change for new user form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Add a new user
  const addUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setShowPopup(false);
    setNewUser({ firstName: '', lastName: '', email: '', profilePic: '' });
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='topHeader'>
        <h2>All</h2>
        <div className="cta--wrap">
          <button onClick={toggleView}>
            <img
              src={isGridView ? Activelistview : gridImg}
              alt={isGridView ? 'List View Icon' : 'Grid View Icon'}
              style={{ width: '20px', marginRight: '8px' }}
            />
            {isGridView ? 'List View' : 'Grid View'}
          </button>
          <button onClick={() => setShowPopup(true)} className='user-cta'>Add New User</button>
        </div>
      </div>

      {/* Grid or List view */}
      {isGridView ? (
        <div className="grid-view">
          {users.map(user => (
            <div className="user-card" key={user.id}>
              <img src={user.profilePic} alt="profile" />
              <h3>{user.firstName} {user.lastName}</h3>
              <p>{user.email}</p>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="list-view">
            <thead>
              <tr>
                <th>Profile Picture</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td><img src={user.profilePic} alt="profile" /></td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add new user popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add New User</h2>
            <input
              type="text"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="profilePic"
              value={newUser.profilePic}
              onChange={handleInputChange}
              placeholder="Profile Picture URL"
            />
            <div className="popup--cta">
              <button onClick={addUser}>Save</button>
              <button onClick={() => setShowPopup(false)} className='cancel--cta'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
