import { describe, it, expect } from 'vitest';
import { processNOVACommand } from './novaEngine';

describe('NOVA Intent Engine', () => {
  const testCases = [
    { input: "Take me to the homepage.", expectedIntent: "home" },
    { input: "Go to the homepage.", expectedIntent: "home" },
    { input: "Back to home.", expectedIntent: "home" },
    { input: "Open Programs.", expectedIntent: "programs" },
    { input: "Show me the programmes.", expectedIntent: "programs" },
    { input: "I want to see your programmes.", expectedIntent: "programs" },
    { input: "Where can I find your programmes?", expectedIntent: "programs" },
    { input: "I want to know what programmes you offer", expectedIntent: "programs" },
    { input: "Take me to Events.", expectedIntent: "events" },
    { input: "What's happening?", expectedIntent: "events" },
    { input: "Take me to upcoming events.", expectedIntent: "events" },
    { input: "Open resources.", expectedIntent: "resources" },
    { input: "Show me your resources.", expectedIntent: "resources" },
    { input: "Take me to the resource centre.", expectedIntent: "resources" },
    { input: "How do I join?", expectedIntent: "membership" },
    { input: "Show me membership.", expectedIntent: "membership" },
    { input: "Take me to the membership page.", expectedIntent: "membership" },
    { input: "How can I join NationsWorld?", expectedIntent: "membership" },
    { input: "Take me to the application.", expectedIntent: "application" },
    { input: "I want to apply.", expectedIntent: "application" },
    { input: "Open the application form.", expectedIntent: "application" },
    { input: "Show me leadership programmes.", expectedIntent: "leadership_programs" },
    { input: "Show me research programmes.", expectedIntent: "research_programs" },
    { input: "Take me to TPD.", expectedIntent: "tpd" },
    { input: "Tell me about The Productive Discourse.", expectedIntent: "tpd" },
    { input: "Take me to the contact page.", expectedIntent: "contact" },
    { input: "Go back.", expectedIntent: "back" },
    { input: "Blah blah xyz 123456", expectedIntent: "unknown" }
  ];

  testCases.forEach((tc) => {
    it(`correctly classifies "${tc.input}" as ${tc.expectedIntent}`, async () => {
      const result = await processNOVACommand(tc.input);
      expect(result.intent).toBe(tc.expectedIntent);
    });
  });
});
