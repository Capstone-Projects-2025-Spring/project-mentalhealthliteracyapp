import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
// This is what the client will see
startTransition(() => {
  hydrateRoot(document, <HydratedRouter />);
});
