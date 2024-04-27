import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "../../helpers/interceptor";
import { toast } from "react-toastify";
import moment from "moment";

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async() => {
    try {
        const response: any = await Axios.get('/users');
        if(response.data) {
            setUsers(response.data);
        }
    } catch (error: any) {
        toast.error(error.response.message || error.response.data.message);
    }
  }
  
  const formattedDate = (date: Date) => {
    return moment(date).format('DD/MM/YYYY')
  };

  return (
    <div className="row mx-3 mx-md-0 justify-content-center align-items-center h-100">
      <Table className="col-12" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user: any, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.profile.firstname || '-'}</td>
                  <td>{user.profile.lastname || '-'}</td>
                  <td>{user.profile.gender || '-'}</td>
                  <td>{formattedDate(user.profile.date_of_birth) || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>{user.phone || '-'}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserListPage;
