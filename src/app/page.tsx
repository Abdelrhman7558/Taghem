import StepWizard from "@/components/booking/StepWizard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden font-cairo">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#0F172A] opacity-90 -z-20" />
      {/* Gradient glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="relative z-10 py-8 text-center">
        <div className="mb-4 flex justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary drop-shadow-md">خيمة قعدة زمان</h1>
        </div>
      </header>

      <StepWizard />
    </main>
  );
}
