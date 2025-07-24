import { useEffect, useState } from "react";
export function useClientHook() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}
export default useClientHook;
