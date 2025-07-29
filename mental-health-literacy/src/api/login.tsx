import store from "src/context/global_store";
import type { Route } from "./+types/login";
import { user_login } from "src/context/features/user/userSlice";

export async function clientAction({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  console.log("Login action triggered with email:", email);
  console.log("Login action triggered with password:", password);

  console.log(await store.dispatch(user_login({ email, password })));
  console.log("Login action triggered");
  return {
    status: 200,
    message: "Login successful",
  };
}
