-- Note: This schema is for reference only and is not meant to be executed directly.
-- Table order and constraints may need adjustment for actual database setup.

CREATE TABLE public.categories (
  id bigint NOT NULL,
  url text,
  name text,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.categoryPreferences (
  categoryId bigint NOT NULL,
  preferenceId bigint NOT NULL,
  CONSTRAINT categoryPreferences_pkey PRIMARY KEY (categoryId, preferenceId),
  CONSTRAINT categoryPreferences_categoryId_fkey FOREIGN KEY (categoryId) REFERENCES public.categories(id),
  CONSTRAINT categoryPreferences_preferenceId_fkey FOREIGN KEY (preferenceId) REFERENCES public.preferences(id)
);
CREATE TABLE public.preferences (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text,
  type text,
  CONSTRAINT preferences_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  display_name text,
  email text,
  CONSTRAINT user_pkey PRIMARY KEY (id),
  CONSTRAINT user_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.userInteractions (
  like boolean NOT NULL,
  videoId bigint NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT userInteractions_pkey PRIMARY KEY (videoId, user_id),
  CONSTRAINT userInteractions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id),
  CONSTRAINT userInteractions_videoId_fkey FOREIGN KEY (videoId) REFERENCES public.videos(id)
);
CREATE TABLE public.userPreferences (
  user_id uuid NOT NULL,
  preference_id bigint NOT NULL,
  CONSTRAINT userPreferences_pkey PRIMARY KEY (user_id, preference_id),
  CONSTRAINT userpreferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id),
  CONSTRAINT userpreferences_preference_id_fkey FOREIGN KEY (preference_id) REFERENCES public.preferences(id)
);
CREATE TABLE public.videoCategories (
  videoId bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  categoryId bigint NOT NULL,
  CONSTRAINT videoCategories_pkey PRIMARY KEY (videoId, categoryId),
  CONSTRAINT videoCategories_videoId_fkey FOREIGN KEY (videoId) REFERENCES public.videos(id),
  CONSTRAINT videoCategories_categoryId_fkey FOREIGN KEY (categoryId) REFERENCES public.categories(id)
);
CREATE TABLE public.videos (
  id bigint NOT NULL,
  playbackId text,
  username text,
  description text,
  likes bigint,
  CONSTRAINT videos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.watchTime (
  user_id uuid NOT NULL,
  video_id bigint,
  started_at bigint NOT NULL,
  ended_at bigint,
  CONSTRAINT watchTime_pkey PRIMARY KEY (user_id),
  CONSTRAINT watchTime_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id),
  CONSTRAINT watchTime_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.videos(id)
);