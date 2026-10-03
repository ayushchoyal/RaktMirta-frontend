
import React, { useEffect, useState } from "react";

const url = "http://localhost:8080";

const UserDetails = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`${url}/admin/users`)
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Loading users...</h3>;
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-4">All Users</h2>

      <div className="table-responsive">

        <table className="table table-bordered table-striped">

          <thead className="table-dark">

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>

            ) : (

              users.map((user) => (

                <tr key={user.id}>

                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default UserDetails;

