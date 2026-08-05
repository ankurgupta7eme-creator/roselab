// =====================================================================
// Rose Prakriti Consultant — widget configuration
// Edit the text below to change how the launcher greets visitors.
// The full persona/system prompt lives server-side — see
// /backend-starter/system-prompt.txt — it is NOT duplicated here.
// =====================================================================
window.ROSE_PRAKRITI_CONFIG = {
  name: 'Rose Prakriti Consultant',
  subtitle: 'Ayurvedic Wellness Assistant',
  avatar: 'assets/bot-logo-transparent.png',
  // Backend endpoint (Lovable server route). Public — no auth required.
  endpoint: '/api/public/rose-prakriti-chat',
  greeting: "Namaste \uD83C\uDF3F I'm Rose Prakriti Consultant, Rose Laboratories' wellness assistant. I can help you understand your Ayurvedic constitution (Prakriti), and share lifestyle, diet, and yoga guidance rooted in Ayurveda. I'm not a doctor, and I can't diagnose or prescribe \u2014 think of me as an educational starting point.",
  quickPrompts: [
    'Help me find my Dosha',
    'I have trouble sleeping',
    'Suggest a morning routine'
  ],
  demoModeMessage: "I'm having trouble responding right now. Please try again in a moment \u2014 or reach us at +91 94722 77067 or roselaboratories1983@gmail.com."
};
