import { Search, MessageCircle, CheckCircle, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover & Browse",
    description: "Explore thousands of verified vendors across all categories"
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Chat with AI",
    description: "Describe your event and get instant AI-powered plans and recommendations"
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Book & Pay Securely",
    description: "Reserve vendors with confidence through our secure escrow system"
  },
  {
    icon: PartyPopper,
    number: "04",
    title: "Celebrate Success",
    description: "Execute your perfect event with real-time coordination tools"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            From vision to reality in four simple steps
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -ml-8 z-0" />
                )}

                {/* Step Card */}
                <div className="relative z-10 text-center space-y-4">
                  {/* Icon Circle */}
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow">
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>

                  {/* Step Number */}
                  <div className="text-6xl font-bold text-primary/20">
                    {step.number}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
