import { getSupabaseClient } from '../lib/supabase';

export interface Video {
  id: number;
  playbackId?: string;
  videoUrl?: string;
  imageUrl?: string;
  username: string;
  description: string;
  likes: number;
  tags?: { label: string; url: string }[];
}

export class VideoService {
  private supabase = getSupabaseClient();

  async getVideos(): Promise<Video[]> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    try {
      const { data: videos, error } = await this.supabase
        .from('videos')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      // Map the database results to your Video interface
      return videos.map(video => ({
        id: video.id,
        playbackId: video.playbackId,
        username: video.username,
        description: video.description,
        likes: video.likes,
        // Generate tags based on video content
        tags: this.getTagsForVideo(video.description)
      }));
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  }

  async updateLikes(videoId: number, newLikeCount: number): Promise<void> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    try {
      const { error } = await this.supabase
        .from('videos')
        .update({ likes: newLikeCount })
        .eq('id', videoId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating likes:', error);
      throw error;
    }
  }

  // Helper function to generate tags based on video description
  private getTagsForVideo(description: string): { label: string; url: string }[] {
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
}

export const videoService = new VideoService();