import { Provider } from "react-redux";
import { store } from "@/app/store.ts";
import { Router } from "@/app/Router.tsx";
import { SnackbarProvider } from "notistack";
import CssBaseline from '@mui/material/CssBaseline';
import { AuthBootstrap } from '@/features/auth/ui/AuthBootstrap.tsx';

export const App= () => {

  return (
    <>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <AuthBootstrap />
          <Router />
        </SnackbarProvider>
      </Provider>
    </>
  )
}

export default App
