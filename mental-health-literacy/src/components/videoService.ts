import supabase from '../lib/supabase';

export interface Video {
  id: number;
  playbackId?: string;
  videoUrl?: string;
  imageUrl?: string;
  username: string;
  description: string;
  likes: number;
  tags?: { label: string; url: string }[];
  isLiked?: boolean;
}

export class VideoService {
  private supabase = supabase();

  // Get videos from recommendations and add like
  async processVideosWithLike(videos: any[]): Promise<Video[]> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    try {
      // Map the database results to your Video interface
      const videosWithTags = videos.map((video: any) => ({
        id: video.id,
        playbackId: video.playbackId,
        username: video.username,
        description: video.description,
        likes: video.likes,
        // Generate tags based on video content
        tags: this.getTagsForVideo(video.description),
        isLiked: false
      }));

      // Check if user is authenticated
      const { data: { user } } = await this.supabase.auth.getUser();

      // If no user is authenticated, return videos without like status
      if (!user) {
        return videosWithTags;
      }

      // Fetch user's liked video IDs
      const { data: userLikes, error: likesError } = await this.supabase
        .from('userInteractions')
        .select('videoId')
        .eq('user_id', user.id)
        .eq('like', true);

      if (likesError) {
        console.error('[VideoService] Error:', likesError);
        return videosWithTags;
      }

      // Update isLiked for videos user has liked
      if (userLikes && userLikes.length > 0) {
        const likedVideoIds = new Set(userLikes.map(like => like.videoId));
        
        videosWithTags.forEach(video => {
          const wasLiked = likedVideoIds.has(video.id);
          video.isLiked = wasLiked;
        });
      }
      return videosWithTags;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async updateLike(videoId: number): Promise<{ success: boolean; newLikeCount: number; isLiked: boolean }> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        throw new Error('User must be authenticated to like videos');
      }

      console.log(`[VideoService] Liking video ${videoId} by user ${user.id}`);

      // Check if user has already liked video
      const { data: existingInteractions, error: checkError } = await this.supabase
        .from('userInteractions')
        .select('*')
        .eq('user_id', user.id)
        .eq('videoId', videoId);

      if (checkError) {
        console.error('[VideoService] Error:', checkError);
        throw checkError;
      }

      const hasExistingInteraction = existingInteractions && existingInteractions.length > 0;
      const currentLikeState = hasExistingInteraction ? existingInteractions[0].like : false;
      const newLikeState = !currentLikeState;

      // Update or insert interaction
      if (hasExistingInteraction) {
        const { error: updateError } = await this.supabase
          .from('userInteractions')
          .update({ like: newLikeState })
          .eq('user_id', user.id)
          .eq('videoId', videoId);

        if (updateError) {
          console.error('[VideoService] Error:', updateError);
          throw updateError;
        }
      } else {
        const { error: insertError } = await this.supabase
          .from('userInteractions')
          .insert({
            user_id: user.id,
            videoId: videoId,
            like: newLikeState
          });

        if (insertError) {
          console.error('[VideoService] Error:', insertError);
          throw insertError;
        }
      }

      // Update video's like count
      const { data: currentVideo, error: videoError } = await this.supabase
        .from('videos')
        .select('likes')
        .eq('id', videoId)
        .single();

      if (videoError) {
        console.error('[VideoService] Error:', videoError);
        throw videoError;
      }

      const newLikeCount = currentVideo.likes + (newLikeState ? 1 : -1);

      const { error: updateLikesError } = await this.supabase
        .from('videos')
        .update({ likes: newLikeCount })
        .eq('id', videoId);

      if (updateLikesError) {
        console.error('[VideoService] Error:', updateLikesError);
        throw updateLikesError;
      }

      console.log(`[VideoService] Updated like for video ${videoId}. New count: ${newLikeCount}, isLiked: ${newLikeState}`);
      
      return { success: true, newLikeCount, isLiked: newLikeState };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // Helper function to generate tags based on video description
  public getTagsForVideo(description: string): { label: string; url: string }[] {
    const tags: { label: string; url: string }[] = [];
    
    if (description.toLowerCase().includes('cbt')) {
      tags.push({ label: "CBT", url: "/resources/cbt" });
    }
    if (description.toLowerCase().includes('anxiety')) {
      tags.push({ label: "Anxiety", url: "/resources/anxiety" });
    }
    if (description.toLowerCase().includes('depression')) {
      tags.push({ label: "Depression", url: "/resources/depression" });
    }
    if (description.toLowerCase().includes('stress')) {
      tags.push({ label: "Stress", url: "/resources/stress" });
    }
    if (description.toLowerCase().includes('therapy')) {
      tags.push({ label: "Therapy", url: "/resources/therapy" });
    }
    if (description.toLowerCase().includes('yoga')) {
      tags.push({ label: "Yoga", url: "/resources/yoga" });
    }
    if (description.toLowerCase().includes('mindfulness')) {
      tags.push({ label: "Mindfulness", url: "/resources/mindfulness" });
    }
    if (description.toLowerCase().includes('peer support')) {
      tags.push({ label: "Peer Support", url: "/resources/peer-support" });
    }
    
    return tags;
  }

  // Get videos that the current user has liked
  async getLikedVideos(): Promise<Video[]> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        console.log('[VideoService] No authenticated user found for getLikedVideos');
        return [];
      }
      console.log(`[VideoService] Fetching liked videos for user ${user.id}`);

      // Get video IDs that user has liked
      const { data: likedVideoIds, error: likesError } = await this.supabase
        .from('userInteractions')
        .select('videoId')
        .eq('user_id', user.id)
        .eq('like', true);

      if (likesError) {
        console.error('[VideoService] Error fetching liked video IDs:', likesError);
        return [];
      }

      if (!likedVideoIds || likedVideoIds.length === 0) {
        console.log('[VideoService] No liked videos found for user');
        return [];
      }

      const videoIds = likedVideoIds.map(like => like.videoId);
      console.log(`[VideoService] Found ${videoIds.length} liked video IDs:`, videoIds);

      // Get video data for liked videos
      const { data: videos, error: videosError } = await this.supabase
        .from('videos')
        .select('*')
        .in('id', videoIds)
        .order('id', { ascending: false });

      if (videosError) {
        console.error('[VideoService] Error fetching liked videos:', videosError);
        return [];
      }

      if (!videos || videos.length === 0) {
        console.log('[VideoService] No videos found in videos table for the liked IDs');
        return [];
      }

      // Map to Video interface with tags and likes
      const likedVideos = videos.map(video => ({
        id: video.id,
        playbackId: video.playbackId,
        username: video.username,
        description: video.description,
        likes: video.likes,
        tags: this.getTagsForVideo(video.description),
        isLiked: true
      }));

      console.log(`[VideoService] Loaded ${likedVideos.length} liked videos for user`);
      return likedVideos;
    } catch (error) {
      console.error('[VideoService] Error in getLikedVideos:', error);
      return [];
    }
  }
}

export const videoService = new VideoService();