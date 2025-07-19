import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, subject, difficulty } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI question enhancement assistant for EDUConnect. Your job is to help students improve their questions to get better answers.

Guidelines:
- Analyze the question for clarity, specificity, and completeness
- Suggest improvements to make the question more effective
- Provide a revised version of the question if needed
- Consider the subject (${subject}) and difficulty level (${difficulty})
- Help students ask questions that will lead to better learning outcomes
- Be encouraging and constructive

Response format:
{
  "analysis": "Brief analysis of the original question",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "improvedQuestion": "Enhanced version of the question",
  "additionalTips": "General tips for asking better questions in this subject"
}`
          },
          {
            role: 'user',
            content: `Please analyze and improve this question:

Subject: ${subject}
Difficulty: ${difficulty}
Question: ${question}`
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let aiResponse = data.choices[0].message.content;

    // Try to parse as JSON, fallback to plain text
    try {
      const parsed = JSON.parse(aiResponse);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch {
      // If not valid JSON, return a structured response
      return new Response(JSON.stringify({
        analysis: "Here's my analysis of your question:",
        suggestions: ["Consider adding more specific details", "Include what you've already tried", "Clarify what exactly you're struggling with"],
        improvedQuestion: aiResponse,
        additionalTips: "Try to be as specific as possible when asking questions."
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in ai-question-enhancer function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred',
      analysis: "I'm having trouble analyzing your question right now.",
      suggestions: ["Try rephrasing your question", "Add more context", "Be more specific about what you need help with"],
      improvedQuestion: question,
      additionalTips: "Clear, specific questions get better answers!"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});