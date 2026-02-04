import { UsersTable } from "../../features/users/ui/UsersTable.tsx";
import { UsersToolbar } from "../../features/users/ui/UsersToolbar.tsx";

export const UserPage = () => {
  return (<>
    <UsersToolbar />
    <UsersTable />
  </>)
}
