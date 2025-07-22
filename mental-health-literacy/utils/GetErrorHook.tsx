import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// This hooks helps avoid hydration issues by ensuring the user data is only fetched on client side.
export function getError() {
  const [error, setError] = useState(null as any);
  const currentError = useSelector((state: any) => {
    return state.user.error;
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      setError(currentError);
    }
  }, [error, currentError]);

  return error;
}
