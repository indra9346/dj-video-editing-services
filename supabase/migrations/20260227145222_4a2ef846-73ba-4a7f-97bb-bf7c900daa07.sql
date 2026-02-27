
-- Create feedback table for real-time customer reviews
CREATE TABLE public.feedbacks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

-- Anyone can read feedbacks (public testimonials)
CREATE POLICY "Anyone can read feedbacks"
  ON public.feedbacks FOR SELECT
  USING (true);

-- Anyone can insert feedback (no auth required for public feedback form)
CREATE POLICY "Anyone can submit feedback"
  ON public.feedbacks FOR INSERT
  WITH CHECK (true);

-- Enable realtime for feedbacks
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedbacks;
