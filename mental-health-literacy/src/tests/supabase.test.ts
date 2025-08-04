import { createClient } from "@supabase/supabase-js";
import supabase from "src/lib/supabase";
import { describe, it, expect } from "vitest";

/* These tests make sure that we are able to initialize a Supabase client*/

test("VITE_SUPABASE_URL should be defined", () => {
  expect(import.meta.env.VITE_SUPABASE_URL).toBeTruthy();
});

test("import.meta.env.VITE_SUPABASE_ANON_KEY should be defined", () => {
  expect(import.meta.env.VITE_SUPABASE_ANON_KEY).toBeTruthy();
});

test("Supabase client successfully initialized when provided with proper env vars", () => {
  expect(supabase()).toBeDefined();
});
