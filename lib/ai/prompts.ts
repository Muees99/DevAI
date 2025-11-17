// lib/ai/prompts.ts

export const CODE_REVIEW_PROMPT = `
You are an expert code reviewer. Analyze the following code and provide:

1. Security Issues (Critical, High, Medium, Low)
2. Performance Issues
3. Code Style Issues
4. Best Practice Violations
5. Suggestions for Improvement
6. Overall Quality Score (0-100)

Code Language: {language}
Code:
{code}

Return response in JSON format:
{
  "score": number,
  "issues": [
    {
      "severity": "critical" | "high" | "medium" | "low",
      "type": "security" | "performance" | "style" | "best-practice",
      "line": number,
      "message": string,
      "suggestion": string
    }
  ],
  "summary": string
}
`;
