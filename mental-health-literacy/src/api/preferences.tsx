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

        // Get preference IDs from preferences table with type
        const { data: prefRows, error: prefError } = await supabase()
            .from("preferences")
            .select("id, name, type")
            .in("name", preferences);

        if (prefError) {
            console.log("[Preferences] Error fetching preferences:", prefError);
            return { error: "Error fetching preferences", status: 400 };
        }

        if (!prefRows || prefRows.length === 0) {
            console.log("[Preferences] No matching preferences found");
            return { error: "No matching preferences found", status: 400 };
        }

        console.log("[Preferences] Found preference rows:", prefRows);

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

// Fetch user preferences from Supabase
export async function fetchUserPreferences() {
    try {
        
        // Get the current user from Supabase Auth
        const { data: { user }, error: userError } = await supabase().auth.getUser();
        if (!user) {
            console.log("[Preferences] No authenticated user.");
            return { error: "User not authenticated", status: 401 };
        }

        // Get user preferences with preference details using join
        const { data: userPrefs, error: prefError } = await supabase()
            .from("userPreferences")
            .select(`
                preference_id,
                preferences (
                    id,
                    name,
                    type
                )
            `)
            .eq("user_id", user.id);

        if (prefError) {
            console.log("[Preferences] Error fetching user preferences:", prefError);
            return { error: "Error fetching preferences", status: 400 };
        }

        if (!userPrefs || userPrefs.length === 0) {
            console.log("[Preferences] No preferences found for user");
            return { data: { interests: [], traits: [] }, status: 200 };
        }


        // Separate interests and traits
        const interests: string[] = [];
        const traits: string[] = [];

        userPrefs.forEach((userPref: any) => {
            const preference = userPref.preferences;
            if (preference && preference.type === 'interest') {
                interests.push(preference.name);
            } else if (preference && preference.type === 'trait') {
                traits.push(preference.name);
            }
        });

        console.log("[Preferences] Fetched preferences:", { interests, traits });
        return { data: { interests, traits }, status: 200 };

    } catch (err: any) {
        console.log("[Preferences] Error:", err);
        return { error: err.message, status: 500 };
    }
}
