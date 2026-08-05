// =====================================================================
// Rose Careers & Partner Connect — widget configuration
// This assistant is embedded inline on careers.html (not a floating
// launcher like Rose Prakriti Consultant, since it's specific to that page).
// The full persona/system prompt lives server-side — see
// /backend-starter/system-prompt-careers.txt — it is NOT duplicated here.
// =====================================================================
window.ROSE_CAREERS_CONFIG = {
  name: 'Rose Careers & Partner Connect',
  subtitle: 'Careers, Distributors & Partnerships',
  avatar: 'assets/logo-transparent.png',
  endpoint: '/api/public/rose-careers-chat',
  greeting: "Hello, I'm Rose Careers & Partner Connect. I can help with Medical Representative / ASM / RSM applications, or with Distributor, Stockist, Super Stockist, Franchise, and Institutional Buyer enquiries. Tell me which one applies to you, and I'll guide you through it. Submitting information here doesn't guarantee any role or partnership \u2014 all applications are reviewed by our team.",
  quickPrompts: [
    'I want to apply as a Medical Representative',
    'I want to become a Distributor',
    'I want to discuss a Franchise opportunity'
  ],
  demoModeMessage: "I'm having trouble responding right now. Please try again in a moment \u2014 or reach our team at +91 94722 77067 or roselaboratories1983@gmail.com."
};
