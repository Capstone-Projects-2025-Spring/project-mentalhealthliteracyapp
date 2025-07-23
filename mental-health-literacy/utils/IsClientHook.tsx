import React, { useEffect, useState } from "react";
export function isClientHook() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}
export default isClientHook;
