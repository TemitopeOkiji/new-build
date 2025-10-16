import { Card } from "@/components/ui/card";
import { Users, Store, Briefcase } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "For Clients",
    description: "Discover and book verified vendors instantly. Get AI recommendations tailored to your budget and vision.",
    features: [
      "Smart vendor matching",
      "Secure payments",
      "Real-time booking",
      "Review & ratings"
    ]
  },
  {
    icon: Store,
    title: "For Vendors",
    description: "Showcase your services, manage bookings, and grow your business with premium exposure.",
    features: [
      "Professional profiles",
      "Calendar management",
      "Direct client messaging",
      "Analytics dashboard"
    ]
  },
  {
    icon: Briefcase,
    title: "For Planners",
    description: "Supercharge your workflow with AI planning tools. Manage multiple events with ease.",
    features: [
      "AI event blueprints",
      "Client collaboration",
      "Vendor network",
      "Budget optimization"
    ]
  }
];

export const ThreePillars = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Built For Everyone
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're planning your dream wedding or growing your vendor business, Planam has you covered
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="p-8 hover:shadow-large transition-all duration-300 border-border bg-card"
            >
              <div className="space-y-6">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow">
                  <pillar.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {pillar.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
