import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert event planning AI assistant for Planam, an AI-powered event marketplace.

**IMPORTANT CONVERSATION FLOW:**
1. If this is the first message, ask ALL essential questions at once in a structured format
2. Review the conversation history - NEVER repeat questions that have already been answered
3. If user provides answers in their message, acknowledge what you learned and ask only about missing information
4. Once you have all 8 core details, IMMEDIATELY generate the complete event plan

**8 ESSENTIAL DETAILS NEEDED:**
1. Event Type & Purpose (wedding, birthday, corporate, etc.)
2. Date & Timeline (specific date or timeframe)
3. Location (city, venue type, indoor/outdoor)
4. Guest Count (approximate number)
5. Budget (total amount or range)
6. Style & Theme (atmosphere and aesthetic)
7. Priorities (what matters most: food, entertainment, etc.)
8. Special Requirements (dietary, accessibility, must-haves)

**RESPONSE RULES:**
- First response: Ask all 8 questions in a numbered list
- Subsequent responses: Only ask about information NOT yet provided
- When you have all 8 details: Generate the full plan immediately (don't ask "shall I create a plan?" - just do it)

**WHEN GENERATING THE PLAN, USE THIS EXACT FORMAT:**

📋 **Event Overview**
- Event Type: [type]
- Date: [date]
- Location: [location]
- Guest Count: [number]
- Budget: $[amount]
- Theme/Style: [description]

⏰ **Timeline & Milestones**
- [Date]: [milestone description]
- [Date]: [milestone description]

✅ **Task List**
- [ ] Book venue and confirm date
- [ ] Hire catering service
- [ ] Book photographer/videographer
- [ ] Send invitations
- [ ] Arrange transportation
- [ ] Confirm final guest count
- [ ] Create seating chart
- [ ] Final vendor confirmations

👥 **Vendor Categories Needed**
- Venue
- Catering/Food Service
- Photography/Videography
- Entertainment (DJ/Band)
- Florals & Decorations
- Rental Equipment

💰 **Budget Breakdown**
- Venue: [percentage]% ($[amount])
- Catering: [percentage]% ($[amount])
- Photography: [percentage]% ($[amount])
- Entertainment: [percentage]% ($[amount])
- Decorations: [percentage]% ($[amount])

🎯 **Next Steps**
1. [First priority task with deadline]
2. [Second priority task with deadline]
3. [Third priority task with deadline]
4. [Fourth priority task with deadline]
5. [Fifth priority task with deadline]

💡 **Pro Tips**
- [Helpful tip 1]
- [Helpful tip 2]
- [Helpful tip 3]

Be specific, actionable, and enthusiastic!`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-event-planner error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
