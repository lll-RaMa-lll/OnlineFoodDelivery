import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

const ValetRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated('valet') && isAutheticated('valet').user.userType === 'valet' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/valet",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default ValetRoute;
