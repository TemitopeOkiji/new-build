-- Create events table to store user events
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "Users can view their own events"
ON public.events
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own events"
ON public.events
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events"
ON public.events
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events"
ON public.events
FOR DELETE
USING (auth.uid() = user_id);

-- Create conversation_messages table to store AI chat history
CREATE TABLE public.conversation_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for conversation_messages
CREATE POLICY "Users can view messages for their own events"
ON public.conversation_messages
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.events
  WHERE events.id = conversation_messages.event_id
  AND events.user_id = auth.uid()
));

CREATE POLICY "Users can create messages for their own events"
ON public.conversation_messages
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.events
  WHERE events.id = conversation_messages.event_id
  AND events.user_id = auth.uid()
));

-- Create event_tasks table for to-do lists
CREATE TABLE public.event_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.event_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for event_tasks
CREATE POLICY "Users can view tasks for their own events"
ON public.event_tasks
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.events
  WHERE events.id = event_tasks.event_id
  AND events.user_id = auth.uid()
));

CREATE POLICY "Users can create tasks for their own events"
ON public.event_tasks
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.events
  WHERE events.id = event_tasks.event_id
  AND events.user_id = auth.uid()
));

CREATE POLICY "Users can update tasks for their own events"
ON public.event_tasks
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.events
  WHERE events.id = event_tasks.event_id
  AND events.user_id = auth.uid()
));

CREATE POLICY "Users can delete tasks for their own events"
ON public.event_tasks
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.events
  WHERE events.id = event_tasks.event_id
  AND events.user_id = auth.uid()
));

-- Create trigger for events updated_at
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for event_tasks updated_at
CREATE TRIGGER update_event_tasks_updated_at
BEFORE UPDATE ON public.event_tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();