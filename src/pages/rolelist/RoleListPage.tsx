
import Axios from "../../helpers/interceptor";
import { useEffect, useState } from "react";
import DataTable from "../../components/data-table/DataTable";
import { toast } from "react-toastify";
import { flattenObject } from "../../helpers/flattenObjects";
import moment from "moment";

const TableWrapper = (WrappedComponent: any) => {
  // This component will wrap the original component
  const CreateRoleTable = (props: any) => {
    const [roleList, setRoleList] = useState<any>([])
    const itemsToShow = ["name", "description", "features", "createdAt"];

    useEffect(() => {
      !roleList.length && getAllRoles();
    }, []);

    const getAllRoles = async () => {
      try {
        const response: any = await Axios.get('/roles');
        if (response.data) {
          const list = response.data.map((item: any) => {
            item.createdAt = moment(item.createdAt).format("DD/MM/YYYY hh:mm");
            return item;
          })
          setRoleList(list);
        }
      } catch (error: any) {
        toast.error(error.response.message || error.response.data.message);
      }
    };

    const setRows = () => {
      if (roleList.length) {
        const rows: any[] = [];
        roleList.map((item: any) => rows.push(flattenObject(item)));
        return rows
      } else {
        return []
      }
    }

    const setColumns = () => {
      if (roleList.length) {
        const flattenedObject = flattenObject(roleList[0]);
        let columns: any[] = Object.keys(flattenedObject)?.filter(item => itemsToShow?.includes(item));
        columns = columns.map(item => {
          return {
            field: item, headerName: item, width: 180
          }
        })
        return columns;
      } else {
        return []
      }
    }

    let newProps = {
      ...props,
      rows: setRows(),
      columns: setColumns(),
      title: "Roles"
    }
    return roleList ? <WrappedComponent {...newProps} /> : null;
  };

  // Return the HOC
  return CreateRoleTable;
};

const RoleListPage = TableWrapper(DataTable);
export default RoleListPage;