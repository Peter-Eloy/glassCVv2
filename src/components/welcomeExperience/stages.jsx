export const WELCOME_STAGES = {
  LOADING: "loading", // Initial "Hello" loading stage
  CONTACTS: "contacts", // Highlight sidebar contacts
  STACKED: "stacked", // Highlight stacked components
  MENU: "menu", // Show menu interaction
  COMPLETE: "complete", // Welcome experience completed
};

export const STAGE_DURATION = {
  [WELCOME_STAGES.LOADING]: 3000, // "Hello" display time
  [WELCOME_STAGES.CONTACTS]: 2000, // Contacts highlight duration
  [WELCOME_STAGES.STACKED]: 2000, // Stacked components highlight duration
  [WELCOME_STAGES.MENU]: 2000, // Menu interaction duration
};
