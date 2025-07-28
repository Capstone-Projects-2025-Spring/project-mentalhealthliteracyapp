import supabase from "src/lib/supabase";

// Get user preferences
export async function getUserPreferences(userId: string) {
    console.log("[getUserPreferences] Starting with userId:", userId);
    try {
        const {data: userPrefs, error} = await supabase()
            .from("userPreferences")
            .select("preference_id")
            .eq("user_id", userId);

        if (error) {
            console.log("[getUserPreferences] Error:", error);
            return [];
        }

        if (!userPrefs || userPrefs.length === 0) {
            console.log("[getUserPreferences] No preferences found");
            return [];
        }

        const preferenceIds = userPrefs.map(p => p.preference_id);
        console.log("[getUserPreferences] Preference IDs:", preferenceIds);
        return preferenceIds;
    } catch (error) {
        console.log("[getUserPreferences] Error:", error);
        return [];
    }
}

// Get categories that match user preferences
export async function getCategoryPreferences(preferenceIds: number[]) {
    console.log("[getCategoryPreferences] Starting with preference IDs:", preferenceIds);
    try {
        if (preferenceIds.length === 0) {
            console.log("[getCategoryPreferences] No preference IDs provided");
            return [];
        }

        const {data: matchingCategories, error} = await supabase()
            .from("categoryPreferences")
            .select("categoryId")
            .in("preferenceId", preferenceIds);

        if (error) {
            console.log("[getCategoryPreferences] Error:", error);
            return [];
        }

        const categoryIds = matchingCategories?.map(c => c.categoryId) || [];
        console.log("[getCategoryPreferences] Category IDs:", categoryIds);
        return categoryIds;
    } catch (error) {
        console.log("[getCategoryPreferences] Error:", error);
        return [];
    }
}

// Get videos from specific categories
export async function getVideosFromCategories(categoryIds: number[]) {
    console.log("[getVideosFromCategories] Starting with category IDs:", categoryIds);
    try {
        if (categoryIds.length === 0) {
            console.log("[getVideosFromCategories] No category IDs provided");
            return [];
        }

        // Get video IDs for categories
        const {data: videoCategories, error: videoCategoriesError} = await supabase()
            .from("videoCategories")
            .select("videoId")
            .in("categoryId", categoryIds);

        if (videoCategoriesError || !videoCategories || videoCategories.length === 0) {
            console.log("[getVideosFromCategories] No video categories found");
            return [];
        }

        const videoIds = videoCategories.map(vc => vc.videoId);
        console.log("[getVideosFromCategories] Mapped Categories:", videoCategories, "to Video IDs:", videoIds);

        // Get video data
        const {data: videos, error: videosError} = await supabase()
            .from("videos")
            .select("*")
            .in("id", videoIds)
            .order("likes", {ascending: false});

        if (videosError) {
            console.log("[getVideosFromCategories] Error fetching videos:", videosError);
            return [];
        }
        console.log("[getVideosFromCategories] Videos:", videos);
        return videos || [];
    } catch (error) {
        console.log("[getVideosFromCategories] Error:", error);
        return [];
    }
}

// Get the current authenticated user ID
export async function getCurrentUserId(userId: string | null = null) {
    if (userId) {
        console.log("[getCurrentUserId] Using provided userId:", userId);
        return userId;
    }

    try {
        const {data: {user}} = await supabase().auth.getUser();
        const currentUserId = user?.id || null;
        console.log("[getCurrentUserId] Current user ID:", currentUserId);
        return currentUserId;
    } catch (error) {
        console.log("[getCurrentUserId] Error getting user:", error);
        return null;
    }
}

// Recommend videos based on user preferences
export async function getRecommendedVideos(userId: string | null = null) {
    console.log("[getRecommendedVideos] Getting recommendations.. ");
    try {
        const authenticatedUserId = await getCurrentUserId(userId);

        if (!authenticatedUserId) {
            console.log("[getRecommendedVideos] No authenticated user, getting all videos");
            return await getAllVideos();
        }

        // Get user preferences
        const preferenceIds = await getUserPreferences(authenticatedUserId);

        if (!preferenceIds || preferenceIds.length === 0) {
            console.log("[getRecommendedVideos] No user preferences, using all videos");
            return await getAllVideos();
        }

        // Get category preferences
        const categoryIds = await getCategoryPreferences(preferenceIds);

        if (!categoryIds || categoryIds.length === 0) {
            console.log("[getRecommendedVideos] No matching categories, using all videos");
            return await getAllVideos();
        }

        // Get recommended videos
        const recommendedVideos = await getVideosFromCategories(categoryIds);

        if (!recommendedVideos || recommendedVideos.length === 0) {
            console.log("[getRecommendedVideos] No recommended videos, using all videos");
            return await getAllVideos();
        }

        console.log("[getRecommendedVideos] Successfully fetched recommended videos");
        return recommendedVideos;
    } catch (error) {
        console.log("[getRecommendedVideos] Error in recommendation process:", error);
        return await getAllVideos();
    }
}

// Get all videos according to likes
export async function getAllVideos() {
    console.log("[getAllVideos] Fetching all videos");
    try {
        const {data: allVideos, error} = await supabase()
            .from("videos")
            .select("*")
            .order("likes", {ascending: false});

        if (error || !allVideos) {
            console.log("[getAllVideos] Error or no data:", error);
            return [];
        }

        console.log("[getAllVideos] Found", allVideos.length, "videos");
        return allVideos;
    } catch (error) {
        console.log("[getAllVideos] Error:", error);
        return [];
    }
}

