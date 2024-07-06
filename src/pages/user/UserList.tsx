import Axios from "../../helpers/interceptor";
import { useEffect, useState, useCallback } from "react";
import DataTable from "../../components/data-table/DataTable";
import { toast } from "react-toastify";
import { flattenObject } from "../../helpers/flattenObjects";
import moment from "moment";

const TableWrapper = (WrappedComponent: any) => {
  const CreateUserTable = (props: any) => {
    const [userList, setUserList] = useState<any>([]);
    const itemsToShow = ["email", "phone", "firstname", "lastname", "gender", "date of birth", "role", "createdAt"];

    const getAllUsers = useCallback(async () => {
      try {
        const response: any = await Axios.get('/users');
        if (response.data) {
          const userData = response.data.map((item: any) => {
            const role = item.role.name;
            delete item.role;
            item.role = role;
            const { firstname, lastname, gender, date_of_birth } = item.profile;
            delete item.profile;
            item.firstname = firstname;
            item.lastname = lastname;
            item.gender = gender;
            item["date of birth"] = moment(date_of_birth).format("DD/MM/YYYY");
            item.createdAt = moment(item.createdAt).format("DD/MM/YYYY hh:mm");
            return item;
          });
          setUserList(userData);
        }
      } catch (error: any) {
        toast.error(error.response.message || error.response.data.message);
      }
    }, []);

    useEffect(() => {
      if (!userList.length) {
        getAllUsers();
      }
    }, [userList.length, getAllUsers]);

    const setRows = () => {
      if (userList.length) {
        return userList.map((item: any) => flattenObject(item));
      } else {
        return [];
      }
    };

    const setColumns = () => {
      if (userList.length) {
        const flattenedObject = flattenObject(userList[0]);
        let columns: any[] = Object.keys(flattenedObject).filter(item => itemsToShow.includes(item));
        columns = columns.map(item => ({
          field: item,
          headerName: item,
          width: item === "email" ? 220 : 160,
        }));
        return columns;
      } else {
        return [];
      }
    };

    let newProps = {
      ...props,
      rows: setRows(),
      columns: setColumns(),
      title: "Users",
      navigationKey: "user",
    };
    return userList.length ? <WrappedComponent {...newProps} /> : null;
  };

  return CreateUserTable;
};

const UserList = TableWrapper(DataTable);
export default UserList;
