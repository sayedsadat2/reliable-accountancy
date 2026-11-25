/* ==========================================================================
   SITE SETTINGS - the file you edit most often.
   Change a value, save, upload the folder again. No other file needs touching.
   ========================================================================== */
window.SITE_CONFIG = {

  /* ---- Contact details (used by forms, chat and footer links) ---- */
  email: "info@reliableaccountancy.ca",
  phone: "437-928-2278",            // main number, shown first
  phoneTel: "+14379282278",         // used for tap-to-call links
  phone2: "416-939-0201",           // second number (shown after the main one)
  phone2Tel: "+14169390201",

  /* ---- Forms ---- */
  formEndpoint: "",   // paste a Formspree / Web3Forms / your own endpoint URL to send forms without opening email
  bookingUrl: "",     // paste a Calendly / Cal.com / Google appointment link to replace the built-in time picker
  portalUrl: "",      // paste your client login / secure upload link to show a "Client login" link in the menu

  /* ---- Social media (paste the full address of each page; empty ones are hidden) ---- */
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100054233630645",     // e.g. "https://www.facebook.com/reliableaccountancy"
    instagram: "https://www.instagram.com/reliableaccountancy.ca/",    // e.g. "https://www.instagram.com/reliableaccountancy"
    tiktok: "https://www.tiktok.com/@reliable.accounta",       // e.g. "https://www.tiktok.com/@reliableaccountancy"
    linkedin: "https://www.linkedin.com/company/reliable-accountancy-inc/",     // e.g. "https://www.linkedin.com/company/reliableaccountancy"
    x: "https://x.com/accountancyinc",            // e.g. "https://x.com/reliableaccountancy"
    youtube: "https://www.youtube.com/@reliableaccountancy",      // e.g. "https://www.youtube.com/@reliableaccountancy"
    googleReviews: "" // your Google review link (Business Profile > "Ask for reviews")
  },

  /* ---- WhatsApp button ---- */
  whatsapp: {
    enabled: true,
    number: "14169390201",          // digits only, with country code, no + or spaces. CHANGE to your WhatsApp Business number if it is different.
    message: "Hello Reliable Accountancy, I would like to ask about "
  },

  /* ---- AI receptionist (Adrian) ---- */
  receptionist: {
    endpoint: "",                   // your Adrian server address, e.g. "https://reliable-receptionist.onrender.com" (no slash at the end). Leave empty to use the built-in answers.
    callNumber: "+13653765222",     // Adrian's phone number
    showCallButton: false           // true = show a "Call Adrian" button inside the chat
  },

  /* ---- Chat bubble ---- */
  chat: {
    enabled: true,
    name: "Adrian",
    subtitle: "Virtual receptionist",
    welcome: "Hello, I'm Adrian, the virtual receptionist for Reliable Accountancy. How can I help you today?",
    privacyNote: "Automated assistant. Please do not share your SIN, banking or card details in chat.",
    quickReplies: [
      "What services do you offer?",
      "Do you do payroll?",
      "What are your hours?",
      { label: "Book a free meeting", action: "book" },
      { label: "Leave a message", action: "message" }
    ],
    openAfterSeconds: 0             // 0 = stays closed until the visitor clicks. 20 = opens by itself after 20 seconds.
  },

  /* ---- "Companies we work with" scrolling strip (under the home page hero) ---- */
  partners: {
    enabled: true,
    title: "Our companies and clients",
    speed: 25,                       // pixels per second (25 matches the design recording)
    // List only companies you own or may name publicly (a client needs written permission first).
    items: ["GTA Driving Academy","Canadian Equity Hire & Consulting Inc.","SBTA","Landbridge Innovation Center","Reliable Home & Kitchen Direct","MasterCrete Contracting","Mokira Gifts"]
  },

  /* ---- Optional content sections (they appear only when you add items) ---- */
  listings: [],       // approved showcase listings: {n:"Name",i:"Industry",c:"City, ON",w:"https://...",d:"What they do",s:"Services"}
  insights: [],       // articles: {cat:"Advisory",t:"Title",d:"Summary",u:"https://link"}
  stories: []         // client stories (with written consent): {ind:"Industry",n:"Business",ch:"Challenge",did:"What we did",res:"Result"}
};
