// // app/api/code-review/route.ts
// import { auth } from "@clerk/nextjs";
// import { openai } from "@/lib/ai/openai";
// import { prisma } from "@/lib/db/prisma";
// import { checkUsageLimit } from "@/lib/usage";

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     if (!userId) return new Response("Unauthorized", { status: 401 });

//     const { code, language } = await req.json();

//     // Check usage limit
//     const canUse = await checkUsageLimit(userId);
//     if (!canUse) {
//       return Response.json({ error: "Usage limit reached" }, { status: 429 });
//     }

//     // Call OpenAI
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: CODE_REVIEW_PROMPT.replace("{language}", language).replace(
//             "{code}",
//             code
//           ),
//         },
//       ],
//       temperature: 0.7,
//     });

//     const result = JSON.parse(completion.choices[0].message.content);

//     // Save to database
//     const review = await prisma.codeReview.create({
//       data: {
//         userId,
//         code,
//         language,
//         issues: result.issues,
//         suggestions: result.suggestions || [],
//         score: result.score,
//         tokensUsed: completion.usage.total_tokens,
//       },
//     });

//     // Increment usage
//     await prisma.user.update({
//       where: { clerkId: userId },
//       data: { requestsThisMonth: { increment: 1 } },
//     });

//     return Response.json(review);
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { language, code } = await req.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: "Missing language or code" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `You are a senior ${language} engineer.
Review the following code and return a JSON response with:
- issues
- improvements
- overall_score (1–10)

Code:
${code}`,
          },
        ],
      }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
