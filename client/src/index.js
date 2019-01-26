import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./reducers/rootReducer";
import setAuthToken from "./utils/setAuthToken";
import { userLoggedIn, userLoggedOut } from "./actions/auth";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.tokenJWT && localStorage.roles) {
    const user = {
        access_token: localStorage.tokenJWT,
        roles: JSON.parse(localStorage.roles)
    };
    setAuthToken(localStorage.tokenJWT);
    store.dispatch(userLoggedIn(user));
    //  Прописываем хук для проверки на истчение expiration time токена.
    //  Теперь если получили 401 ошибку, то делается автоматический разлогин
    axios.interceptors.response.use(null, err => {
        if (`${err}` === "Error: Request failed with status code 401") {
            setAuthToken();
            store.dispatch(userLoggedOut());
            localStorage.removeItem("tokenJWT");
            localStorage.removeItem("activeTabName");
            localStorage.removeItem("roles");
        }
        return Promise.reject(err);
    });
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
