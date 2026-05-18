const axios = require('axios');

class AIService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.baseURL = process.env.OPENROUTER_BASE_URL;
    this.model = 'openai/gpt-3.5-turbo';
  }

  async generateRecommendations(employeeData) {
    try {
      const prompt = this.buildPrompt(employeeData);

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 800,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      return this.parseAIResponse(content);
    } catch (error) {
      console.error('AI API Error:', error.message);
      throw new Error('Failed to generate AI recommendations');
    }
  }

  buildPrompt(employeeData) {
    return `
Analyze the following employee data and provide recommendations:

Employee: ${employeeData.name}
Department: ${employeeData.department}
Performance Score: ${employeeData.performanceScore}/100
Years of Experience: ${employeeData.experience}
Skills: ${employeeData.skills.join(', ')}

Please provide:
1. Promotion Recommendation (yes/no with reason)
2. Training Suggestions (list 2-3)
3. Skill Gaps (what skills to develop)
4. Overall Feedback

Format your response as JSON with keys: promotionSuggestion, trainingSuggestions, skillGaps, feedback
    `;
  }

  parseAIResponse(content) {
    try {
      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback parsing
      return {
        promotionSuggestion: 'Assess performance in next review cycle',
        trainingSuggestions: ['Technical skills development', 'Leadership training'],
        skillGaps: ['Advanced technical skills'],
        feedback: content,
      };
    } catch (error) {
      return {
        promotionSuggestion: 'Pending manual review',
        trainingSuggestions: ['Leadership development'],
        skillGaps: ['Communication skills'],
        feedback: content,
      };
    }
  }

  async rankEmployees(employees) {
    try {
      const employeeList = employees
        .map(
          (e, i) =>
            `${i + 1}. ${e.name} - Score: ${e.performanceScore}, Experience: ${e.experience}yrs, Skills: ${e.skills.join(', ')}`
        )
        .join('\n');

      const prompt = `
Rank the following employees by promotion potential and overall performance:

${employeeList}

Provide a ranked list with justification for each employee's ranking. Format as JSON with array of objects containing: rank, name, justification, developmentAreas
      `;

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('AI Ranking Error:', error.message);
      throw new Error('Failed to rank employees');
    }
  }
}

module.exports = new AIService();
