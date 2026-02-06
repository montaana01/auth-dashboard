import { Provider } from "react-redux";
import { store } from "@/app/store.ts";
import { Router } from "@/app/Router.tsx";

export const App= () => {

  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  )
}

export default App
