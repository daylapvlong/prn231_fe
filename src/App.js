import React, { useEffect } from "react";
import "./assets/scss/hope-ui.scss";
import "./index.css";

// Redux Selector / Action
import { useDispatch } from "react-redux";

// Import state selectors
import { setSetting } from "./store/setting/actions";
import { AuthProvider } from "./components/auth"; // Import your AuthContext
import BoxedFancy from "./layouts/dashboard/boxed-fancy";

function App({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatching setting action when the component mounts
    dispatch(setSetting());
  }, [dispatch]);

  return (
    <div className="App">
      {/* Wrap your application with AuthProvider */}
      <AuthProvider>
        <BoxedFancy>
          {/* This will render your routed components */}
          {children}
        </BoxedFancy>{" "}
      </AuthProvider>
    </div>
  );
}

export default App;
