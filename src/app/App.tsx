import { Provider } from "react-redux";
import { store } from "@/app/store.ts";
import { Router } from "@/app/Router.tsx";
import { SnackbarProvider } from "notistack";

export const App= () => {

  return (
    <>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Router />
        </SnackbarProvider>
      </Provider>
    </>
  )
}

export default App
