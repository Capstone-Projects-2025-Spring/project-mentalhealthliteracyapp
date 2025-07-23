import supabase from "src/lib/supabase";

// Save user preferences for to Supabase
export async function saveUserPreferences(preferences: string[]) {
    try {
        console.log("[Preferences] Saving preferences:", preferences);

        // Get the current user from Supabase Auth
        const { data: { user }, error: userError } = await supabase().auth.getUser();
        console.log("[Preferences] Supabase user:", user);
        if (userError || !user) {
            console.log("[Preferences] No authenticated user.");
            return { error: "User not authenticated", status: 401 };
        }

        // Get preference IDs from preferences table
        const { data: prefRows, error: prefError } = await supabase()
            .from("preferences")
            .select("id, name")
            .in("name", preferences);
        console.log("[Preferences] Preferences found in DB:", prefRows);

        if (prefError) {
            console.log("[Preferences] Error fetching preferences:", prefError);
            return { error: "Error fetching preferences", status: 400 };
        }

        // Prep user_preferences rows
        const userPreferences = prefRows.map((pref: any) => ({
            user_id: user.id,
            preference_id: pref.id,
        }));
        console.log("[Preferences] user_preferences rows to upsert:", userPreferences);

        // Upsert to user_preferences
        const { error: insertError } = await supabase()
            .from("user_preferences")
            .upsert(userPreferences, { onConflict: "user_id,preference_id" });

        if (insertError) {
            console.log("[Preferences] Error saving preferences:", insertError);
            return { error: "Error saving preferences", status: 500 };
        }


        console.log("[Preferences] Preferences saved successfully for user", user.id);
        return { message: "Preferences saved", status: 200 };

    } catch (err: any) {
        console.log("[Preferences] Unexpected error:", err);
        return { error: err.message, status: 500 };
    }
}