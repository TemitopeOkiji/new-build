import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageSquare, Calendar, TrendingUp, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: MessageSquare,
    title: "Voice & Text Input",
    description: "Describe your event naturally — AI understands your vision"
  },
  {
    icon: Calendar,
    title: "Smart Planning",
    description: "Generate complete timelines, checklists, and budgets instantly"
  },
  {
    icon: Wand2,
    title: "Vendor Matching",
    description: "AI recommends the perfect vendors for your style and budget"
  },
  {
    icon: TrendingUp,
    title: "Dynamic Optimization",
    description: "Automatically rebalance plans when details change"
  }
];

export const AIPlanning = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/40 via-background to-muted/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Powered by AI
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Plan Events in
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    {" "}Minutes, Not Months
                  </span>
                </h2>
                
                <p className="text-lg text-muted-foreground">
                  Our AI Co-Planner transforms conversations into complete event blueprints. 
                  Just describe what you want, and watch the magic happen.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex gap-3 p-4 rounded-lg bg-card border border-border hover:shadow-medium transition-all"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" variant="hero" asChild>
                <Link to="/auth">
                  <Sparkles className="w-5 h-5" />
                  Try AI Planner Free
                </Link>
              </Button>
            </div>

            {/* Right: Visual Demo Card */}
            <Card className="p-8 shadow-large border-border bg-gradient-to-br from-card to-card/50">
              <div className="space-y-6">
                {/* Chat Bubble - User */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 shadow-soft">
                    <p className="text-sm">
                      I'm planning a wedding for 150 guests in June with a $50k budget
                    </p>
                  </div>
                </div>

                {/* Chat Bubble - AI */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-muted rounded-2xl rounded-tl-sm px-4 py-3 shadow-soft">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div className="space-y-2">
                        <p className="text-sm text-foreground">
                          Perfect! I've created your wedding blueprint:
                        </p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <span>Venue: $15,000</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <span>Catering: $12,000</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <span>Photography: $8,000</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <span>+ 6 more categories</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="pt-4 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Recommended Vendors
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-border bg-card/50 hover:shadow-soft transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-blue" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">
                              Top Vendor {i}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ★ 4.9 (120+)
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
