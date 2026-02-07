import { UsersTable } from "@/features/users/ui/UsersTable.tsx";
import { UsersToolbar } from "@/features/users/ui/UsersToolbar.tsx";
import {Container, Typography} from "@mui/material";

export const UserPage = () => {
  return (
    <Container>
      <Typography variant={'h2'} sx={{m: 2, textAlign: 'center'}} typography={'h4'}>
        Users control center
      </Typography>
      <UsersToolbar/>
      <UsersTable/>
    </Container>)
}
