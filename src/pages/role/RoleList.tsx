import Axios from "../../helpers/interceptor";
import { useEffect, useState, useCallback } from "react";
import DataTable from "../../components/data-table/DataTable";
import { toast } from "react-toastify";
import { flattenObject } from "../../helpers/flattenObjects";
import moment from "moment";

const TableWrapper = (WrappedComponent: any) => {
  // This component will wrap the original component
  const CreateRoleTable = (props: any) => {
    const [roleList, setRoleList] = useState<any>([]);
    const itemsToShow = ["name", "description", "features", "createdAt"];

    const getAllRoles = useCallback(async () => {
      try {
        const response: any = await Axios.get('/roles');
        if (response.data) {
          const list = response.data.map((item: any) => {
            item.createdAt = moment(item.createdAt).format("DD/MM/YYYY hh:mm");
            return item;
          });
          !roleList?.length && setRoleList(list);
        }
      } catch (error: any) {
        toast.error(error.response.message || error.response.data.message);
      }
    }, []);

    useEffect(() => {
      if (!roleList.length) {
        getAllRoles();
      }
    }, [roleList.length, getAllRoles]);

    const setRows = () => {
      if (roleList.length) {
        roleList.map((item: any) => {
          item.features = item.features.map((feature: any) => feature.name || feature);
          return item;
        })
        return roleList.map((item: any) => flattenObject(item));
      } else {
        return [];
      }
    };

    const setColumns = () => {
      if (roleList.length) {
        const flattenedObject = flattenObject(roleList[0]);
        let columns: any[] = Object.keys(flattenedObject).filter(item => itemsToShow.includes(item));
        columns = columns.map(item => ({
          field: item,
          headerName: item,
          width: item === "features" || item === "description" ? 500 : 150,
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
      title: "Roles",
      navigationKey: "role",
    };
    return roleList.length ? <WrappedComponent {...newProps} /> : null;
  };

  // Return the HOC
  return CreateRoleTable;
};

const RoleListPage = TableWrapper(DataTable);
export default RoleListPage;
