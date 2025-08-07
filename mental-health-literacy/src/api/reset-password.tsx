import store from "src/context/global_store";
import type { Route } from "./+types/register";
import { user_reset_password } from "src/context/features/user/userSlice";

export async function clientAction({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  await store.dispatch(
    user_reset_password({
      email,
    })
  );

  return {
    status: 200,
    message: "Registration successful",
  };
}
