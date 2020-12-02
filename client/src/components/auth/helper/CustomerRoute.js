import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

const CustomerRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated('customer') && isAutheticated('customer').user.userType === 'customer' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default CustomerRoute;
