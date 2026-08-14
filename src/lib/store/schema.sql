-- ============================================================
-- SQL Schema for S-RAB Supabase Database Integration
-- Run this script in the Supabase SQL Editor
-- ============================================================

-- Create projects table with JSONB document storage for nested data structures
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    tax_rate NUMERIC NOT NULL DEFAULT 0.12,
    profit_rate NUMERIC NOT NULL DEFAULT 0.10,
    duration_weeks INTEGER NOT NULL DEFAULT 12,
    active_sub_project_id TEXT,
    sub_projects JSONB NOT NULL DEFAULT '[]'::jsonb,
    daily_logs JSONB NOT NULL DEFAULT '[]'::jsonb,
    weekly_progress JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- Enable Row Level Security (RLS) for data security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy to restrict access to authenticated owners only
CREATE POLICY "Users can manage their own projects" 
ON public.projects 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create index on user_id for high performance queries
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);

-- Migrasi Fase 2: Tambah kolom weekly_financials dan payment_terms
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS weekly_financials JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS payment_terms JSONB NOT NULL DEFAULT '[]'::jsonb;
