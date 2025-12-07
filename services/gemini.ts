import { GoogleGenAI, Chat } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for "J Shots Media", a premium photography and videography agency based in Lagos, Nigeria.
Your tone is professional, creative, and welcoming.

Key Information about J Shots Media:
- Services: Professional Photography, Videography, Drone Shots, Mobile Content Creation.
- Locations Served: Ikeja, Lekki, Victoria Island, Ikoyi, Yaba, and greater Lagos.
- Team:
  1. Director (Toju Dediare): Handles major projects and creative direction.
  2. Photographer (Smyleon): Specialist in photography and visual storytelling.
  3. Secretary (Taiwo): Handles scheduling and general inquiries.

Your Goal:
- Assist customers with booking inquiries.
- Explain the difference between sessions.
- Direct them to the specific team member if they ask for the director, photographer, or secretary.
- If they want to book, guide them to the booking form on the website.

Do not ask for credit card information.
Keep responses concise and helpful.
`;

export const getChatResponse = async (userMessage: string): Promise<string> => {
  try {
    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }

    const result = await chatSession.sendMessage({ message: userMessage });
    return result.text || "I'm having trouble connecting to the studio right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm currently unable to process your request. Please check your internet connection.";
  }
};

export const resetChat = () => {
  chatSession = null;
};