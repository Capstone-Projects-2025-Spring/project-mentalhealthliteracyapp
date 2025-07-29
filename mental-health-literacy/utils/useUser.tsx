import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// This hooks helps avoid hydration issues by ensuring the user data is only fetched on client side.
export default function useUser() {
  const [user, setUser] = useState(null as any);
  const currentUser = useSelector((state: any) => {
    return state.user.user;
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(currentUser);
    }
  }, [currentUser]);

  return user;
}
