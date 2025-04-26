import Chat from "@/components/Chat/Chat";
import AppWrapper from "@/components/app-wrapper";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 bg-[url('/background.png')] bg-cover bg-center">
      <AppWrapper>
        <Chat />
      </AppWrapper>
    </div>
  );
}