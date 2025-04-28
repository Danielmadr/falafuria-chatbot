/**
 * Home Page Component
 *
 * This file defines the main landing page of the application, which contains
 * the chat interface wrapped in the application container.
 *
 * @module page
 */

import Chat from "@/components/Chat/Chat";
import AppWrapper from "@/components/layout/app-wrapper";

/**
 * Home Page Component
 *
 * Renders the main page of the application featuring:
 * - A full-height background with the FURIA theme
 * - The AppWrapper container for consistent page styling
 * - The Chat component which handles the AI conversation interface
 *
 * @returns {JSX.Element} The rendered home page
 */
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 bg-[url('/background.png')] bg-cover bg-center">
      <AppWrapper>
        <Chat />
      </AppWrapper>
    </div>
  );
}
