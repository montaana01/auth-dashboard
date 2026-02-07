import { Provider } from "react-redux";
import { store } from "@/app/store.ts";
import { Router } from "@/app/Router.tsx";
import { SnackbarProvider } from "notistack";
import CssBaseline from '@mui/material/CssBaseline';

export const App= () => {

  return (
    <>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <Router />
        </SnackbarProvider>
      </Provider>
    </>
  )
}

export default App
