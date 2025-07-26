import store from "src/context/global_store";
import type { Route } from "./+types/signout";
import { reset_error, user_signout } from "src/context/features/user/userSlice";
import useUserError from "utils/useUserError";

export async function clientAction() {
  // First, reset the error
  store.dispatch(reset_error());

  // Then attempt to signout
  store.dispatch(user_signout());
  const error = useUserError();

  if (error) {
    return {
      status: 400,
      message: error,
    };
  }
  return {
    status: 200,
    message: "Signout successful",
  };
}
