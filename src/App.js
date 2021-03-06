import * as React from "react";
import { Route } from "react-router";
import { Provider } from "react-redux";
import { createHashHistory } from "history";
import { Admin, Resource, Authenticated } from "react-admin";
import { PostList, PostEdit, PostCreate } from "./posts";
import { UserList } from "./users";
import DashBoard from "./Dashboard";
import authProvider from "./authProvider";
import MyMenu from "./MyMenu";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import Foo from "./MyPage";
import jsonServerProvider from "ra-data-json-server";
import createAdminStore from "./createAdminStore";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const CustomRoutes = [
  <Route
    path="/foo"
    render={() => (
      <Authenticated>
        <Foo />
      </Authenticated>
    )}
  />,
];

const history = createHashHistory();

const App = () => (
  <Provider
    store={createAdminStore({
      authProvider,
      dataProvider,
      history,
    })}
  >
    <Admin
      dataProvider={dataProvider}
      dashboard={DashBoard}
      authProvider={authProvider}
      customRoutes={CustomRoutes}
      history={history}
      menu={MyMenu}
    >
      {(permission) => [
        <Resource
          name="posts"
          list={PostList}
          edit={permission === "admin" && PostEdit}
          create={PostCreate}
          icon={PostIcon}
        />,

        permission === "admin" && (
          <Resource name="users" list={UserList} icon={UserIcon} />
        ),
      ]}
    </Admin>
  </Provider>
);

export default App;
