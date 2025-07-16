import store from "src/context/global_store";
import type { Route } from "./+types/register";
import { register } from "src/context/features/user/userSlice";

export async function clientAction({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Call the Supabase API to create a new user
  console.log("Register action triggered with email:", email);
  console.log("Register action triggered with password:", password);
  await store.dispatch(
    register({
      email,
      password,
    })
  );

  return {
    status: 200,
    message: "Registration successful",
  };
}
