this is my schema for my db what ideas do you think i should have on my admin page 
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.categories (
  name text,
  id bigint NOT NULL,
  url text,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.categoryPreferences (
  preferenceId bigint NOT NULL,
  categoryId bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT categoryPreferences_pkey PRIMARY KEY (categoryId, preferenceId),
  CONSTRAINT categoryPreferences_preferenceId_fkey FOREIGN KEY (preferenceId) REFERENCES public.preferences(id),
  CONSTRAINT categoryPreferences_categoryId_fkey FOREIGN KEY (categoryId) REFERENCES public.categories(id)
);
CREATE TABLE public.preferences (
  type text,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text,
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
  videoId bigint NOT NULL,
  user_id uuid NOT NULL,
  like boolean NOT NULL,
  CONSTRAINT userInteractions_pkey PRIMARY KEY (videoId, user_id),
  CONSTRAINT userInteractions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id),
  CONSTRAINT userInteractions_videoId_fkey FOREIGN KEY (videoId) REFERENCES public.videos(id)
);
CREATE TABLE public.userPreferences (
  user_id uuid NOT NULL,
  preference_id bigint NOT NULL,
  CONSTRAINT userPreferences_pkey PRIMARY KEY (user_id, preference_id),
  CONSTRAINT userpreferences_preference_id_fkey FOREIGN KEY (preference_id) REFERENCES public.preferences(id),
  CONSTRAINT userpreferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(id)
);
CREATE TABLE public.videoCategories (
  videoId bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  categoryId bigint NOT NULL,
  CONSTRAINT videoCategories_pkey PRIMARY KEY (videoId, categoryId),
  CONSTRAINT videoCategories_videoId_fkey FOREIGN KEY (videoId) REFERENCES public.videos(id),
  CONSTRAINT videoCategories_categoryId_fkey FOREIGN KEY (categoryId) REFERENCES public.categories(id)
);
CREATE TABLE public.videos (
  playbackId text,
  username text,
  description text,
  likes bigint,
  id bigint NOT NULL,
  CONSTRAINT videos_pkey PRIMARY KEY (id)
);