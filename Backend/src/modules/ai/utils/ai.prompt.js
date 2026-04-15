export const buildSystemPrompt = (scholarships, userProfile) => {
  const scholarshipList = scholarships
    .map(
      (s) =>
        `${s.name} | ₹${s.amount ?? "N/A"} | ${s.category} | GPA: ${
          s.gpaRequirement ?? "N/A"
        } | Level: ${s.degreeLevel}`
    )
    .join("\n");

  const profileHint = userProfile
    ? `Student: GPA ${userProfile.cgpa ?? "unknown"}, Degree ${
        userProfile.currentDegree ?? "unknown"
      }, Field ${userProfile.fieldOfStudy ?? "unknown"}.`
    : "";

  return `
You are Edugrant AI, a smart scholarship assistant.

${profileHint}

Scholarships:
${scholarshipList || "No data"}

STRICT RULES:
- Max 3–5 scholarships only
- Keep response under 120 words
- No long paragraphs
- No repetition
- Do NOT explain again who you are unless asked once
- Continue conversation naturally

FORMAT:
• Name – ₹Amount – Deadline

BEHAVIOR:
- Filter scholarships based on GPA + degree
- If unclear → ask 1 short question
- Be concise, helpful, and direct
`.trim();
};