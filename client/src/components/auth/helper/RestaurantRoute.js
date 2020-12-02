import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

const RestaurantRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated('restaurant') && isAutheticated('restaurant').user.userType === 'restaurant' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/restaurant",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default RestaurantRoute;
