import type { FormEvent } from "react";

export async function RequestAuth(event?: FormEvent) {
  if (event) {
    event.preventDefault();
    // Query server for authentication
  }
}
