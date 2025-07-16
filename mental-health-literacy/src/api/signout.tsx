import store from "src/context/global_store";
import type { Route } from "./+types/signout";
import { signout } from "src/context/features/user/userSlice";

export async function clientAction({ params, request }: Route.ActionArgs) {
  store.dispatch(signout());
  return {
    status: 200,
    message: "Signout successful",
  };
}
