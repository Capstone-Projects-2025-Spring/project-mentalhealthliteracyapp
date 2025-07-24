import supabase from "src/lib/supabase";

// Save user preferences to Supabase
export async function saveUserPreferences(preferences: string[]) {
    try {
        console.log("[Preferences] Saving preferences:", preferences);
        
        // Get the current user from Supabase Auth
        const { data: { user }, error: userError } = await supabase().auth.getUser();
        if (!user) {
            console.log("[Preferences] No authenticated user.");
            return { error: "User not authenticated", status: 401 };
        }

        // Get preference IDs from preferences table
        const { data: prefRows, error: prefError } = await supabase()
            .from("preferences")
            .select("id, name")
            .in("name", preferences);

        if (prefError) {
            console.log("[Preferences] Error fetching preferences:", prefError);
            return { error: "Error fetching preferences", status: 400 };
        }

        // Prep userPreferences rows
        const userPreferences = prefRows.map((pref: any) => ({
            user_id: user.id,
            preference_id: pref.id,
        }));

        // Delete existing preferences for user
        const { error: deleteError } = await supabase()
            .from("userPreferences")
            .delete()
            .eq("user_id", user.id);

        if (deleteError) {
            console.log("[Preferences] Error deleting existing preferences:", deleteError);
            return { error: "Error updating preferences", status: 500 };
        }

        // Insert new preferences
        const { error: insertError } = await supabase()
            .from("userPreferences")
            .insert(userPreferences);

        if (insertError) {
            console.log("[Preferences] Error saving preferences:", insertError);
            return { error: "Error saving preferences", status: 500 };
        }

        console.log("[Preferences] Preferences saved successfully for user", user.id);
        return { message: "Preferences saved", status: 200 };

    } catch (err: any) {
        console.log("[Preferences] Error:", err);
        return { error: err.message, status: 500 };
    }
}