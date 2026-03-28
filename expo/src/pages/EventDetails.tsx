import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Loader2, MessageSquare, CheckCircle2, Users } from "lucide-react";

type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
};

type Message = {
  id: string;
  role: string;
  content: string;
  created_at: string;
};

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchEventData();
  };

  const extractTasksFromAI = (messages: Message[]): string[] => {
    const tasks: string[] = [];
    const assistantMessages = messages.filter(m => m.role === "assistant");
    
    // Get the last comprehensive AI message (usually the event plan)
    const lastAssistantMsg = assistantMessages[assistantMessages.length - 1];
    
    if (lastAssistantMsg) {
      const content = lastAssistantMsg.content;
      
      // Look for Task List section with checkboxes
      const taskSectionMatch = content.match(/✅\s*\*\*Task List\*\*[\s\S]*?(?=\n\n[👥💰🎯💡📋⏰]|$)/i);
      if (taskSectionMatch) {
        const lines = taskSectionMatch[0].split('\n');
        lines.forEach(line => {
          const trimmed = line.trim();
          // Match both checkbox format and bullet/number format
          if (trimmed.match(/^[-•*\[\]]\s+/) || trimmed.match(/^\d+\.\s+/)) {
            let task = trimmed
              .replace(/^[-•*]\s+/, '')
              .replace(/^\d+\.\s+/, '')
              .replace(/^\[\s*\]\s*/, '')
              .replace(/^\[x\]\s*/i, '')
              .trim();
            
            if (task && task.length > 5 && !task.startsWith('*')) {
              tasks.push(task);
            }
          }
        });
      }

      // Also extract from Next Steps section
      const nextStepsMatch = content.match(/🎯\s*\*\*Next Steps\*\*[\s\S]*?(?=\n\n[👥💰💡📋⏰✅]|$)/i);
      if (nextStepsMatch) {
        const lines = nextStepsMatch[0].split('\n');
        lines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed.match(/^\d+\.\s+/)) {
            let task = trimmed.replace(/^\d+\.\s+/, '').trim();
            if (task && task.length > 5 && !tasks.some(t => t.includes(task.slice(0, 20)))) {
              tasks.push(task);
            }
          }
        });
      }
    }
    
    return tasks.slice(0, 25);
  };

  const extractVendorsFromAI = (messages: Message[]): string[] => {
    const vendors: string[] = [];
    const assistantMessages = messages.filter(m => m.role === "assistant");
    
    // Get the last comprehensive AI message
    const lastAssistantMsg = assistantMessages[assistantMessages.length - 1];
    
    if (lastAssistantMsg) {
      const content = lastAssistantMsg.content;
      
      // Look for Vendor Categories section
      const vendorSectionMatch = content.match(/👥\s*\*\*Vendor Categories Needed\*\*[\s\S]*?(?=\n\n[💰🎯💡📋⏰✅]|$)/i);
      if (vendorSectionMatch) {
        const lines = vendorSectionMatch[0].split('\n');
        lines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed.match(/^[-•*]\s+/) || trimmed.match(/^\d+\.\s+/)) {
            const vendor = trimmed
              .replace(/^[-•*]\s+/, '')
              .replace(/^\d+\.\s+/, '')
              .trim();
            
            if (vendor && vendor.length > 3 && !vendor.startsWith('*')) {
              vendors.push(vendor);
            }
          }
        });
      }
    }
    
    return vendors;
  };

  const fetchEventData = async () => {
    try {
      // Fetch event
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (eventError) throw eventError;
      setEvent(eventData);

      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from("conversation_messages")
        .select("*")
        .eq("event_id", id)
        .order("created_at", { ascending: true });

      if (messagesError) throw messagesError;
      setMessages(messagesData || []);

      // Fetch tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from("event_tasks")
        .select("*")
        .eq("event_id", id)
        .order("created_at", { ascending: true });

      if (tasksError) throw tasksError;

      // Auto-populate tasks from AI plan if none exist yet
      let currentTasks = tasksData || [];
      if ((!currentTasks || currentTasks.length === 0) && (messagesData && messagesData.length > 0)) {
        const aiTasks = extractTasksFromAI(messagesData);
        if (aiTasks.length > 0) {
          const toInsert = aiTasks.map((title) => ({ event_id: id as string, title, completed: false }));
          const { data: inserted, error: insertError } = await supabase
            .from("event_tasks")
            .insert(toInsert)
            .select();
          if (insertError) {
            console.error("Error auto-importing tasks:", insertError);
          } else if (inserted) {
            currentTasks = inserted;
            toast({ title: "Tasks Added", description: `Imported ${inserted.length} tasks from your AI plan.` });
          }
        }
      }

      setTasks(currentTasks);
    } catch (error) {
      console.error("Error fetching event data:", error);
      toast({
        title: "Error",
        description: "Failed to load event details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim() || !id) return;

    try {
      const { data, error } = await supabase
        .from("event_tasks")
        .insert({
          event_id: id,
          title: newTaskTitle.trim(),
          completed: false,
        })
        .select()
        .single();

      if (error) throw error;

      setTasks([...tasks, data]);
      setNewTaskTitle("");
      toast({
        title: "Task Added",
        description: "New task has been added to your event.",
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast({
        title: "Error",
        description: "Failed to add task.",
        variant: "destructive",
      });
    }
  };

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from("event_tasks")
        .update({ completed: !completed })
        .eq("id", taskId);

      if (error) throw error;

      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !completed } : task
      ));
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Event not found</p>
        <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{event.title}</h1>
              {event.description && (
                <p className="text-sm text-muted-foreground">{event.description}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="conversation" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Conversation
            </TabsTrigger>
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Vendors
            </TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>To-Do List</CardTitle>
                <CardDescription>Tasks from your event plan - add more as needed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add a new task..."
                    onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                  />
                  <Button onClick={handleAddTask} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* AI-extracted tasks */}
                {messages.length > 0 && tasks.length === 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">From AI Plan:</h4>
                    {extractTasksFromAI(messages).map((taskText, index) => (
                      <div
                        key={`ai-task-${index}`}
                        className="p-3 rounded-lg bg-muted/30 border border-border"
                      >
                        <p className="text-sm">{taskText}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Manual tasks */}
                {tasks.length > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="text-sm font-medium text-muted-foreground">Your Tasks:</h4>
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => handleToggleTask(task.id, task.completed)}
                        />
                        <span
                          className={`flex-1 ${
                            task.completed ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conversation Tab */}
          <TabsContent value="conversation" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Conversation</CardTitle>
                <CardDescription>Your planning conversation history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No conversation history yet.
                    </p>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 rounded-lg ${
                          message.role === "user"
                            ? "bg-gradient-hero text-primary-foreground ml-8"
                            : "bg-muted mr-8"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Vendors</CardTitle>
                <CardDescription>Vendor categories suggested by AI for your event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No vendor recommendations yet.
                    </p>
                  ) : extractVendorsFromAI(messages).length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No vendors found in conversation. The AI will suggest vendors after you provide event details.
                    </p>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {extractVendorsFromAI(messages).map((vendor, index) => (
                        <div
                          key={`vendor-${index}`}
                          className="p-4 rounded-lg bg-muted/50 border border-border hover:bg-muted transition-colors"
                        >
                          <p className="text-sm font-medium">{vendor}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="pt-4 border-t">
                    <Button onClick={() => navigate("/vendors")} className="w-full">
                      Browse All Vendors
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventDetails;
