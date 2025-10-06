import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AISummaryResult {
  summary: string;
  severity: 'low' | 'medium' | 'high';
}

export async function generateIncidentSummary(imageBase64: string): Promise<AISummaryResult> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this security incident photo and provide a 1-2 sentence summary of what you see. Focus on visible issues or anomalies. Also classify the severity as low, medium, or high based on the apparent urgency.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 200,
    });

    const content = response.choices[0]?.message?.content || '';
    const summary = content.split('.')[0] + '.'; // Take first sentence

    // Simple severity classification based on keywords
    let severity: 'low' | 'medium' | 'high' = 'low';
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('broken') || lowerContent.includes('damage') || lowerContent.includes('emergency')) {
      severity = 'high';
    } else if (lowerContent.includes('suspicious') || lowerContent.includes('unusual') || lowerContent.includes('concern')) {
      severity = 'medium';
    }

    return {
      summary,
      severity,
    };
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return {
      summary: 'Unable to analyze image at this time.',
      severity: 'low',
    };
  }
}

