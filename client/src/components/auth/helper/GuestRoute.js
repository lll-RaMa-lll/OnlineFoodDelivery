import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

const GuestRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAutheticated('customer')? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default GuestRoute;
