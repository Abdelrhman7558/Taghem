import StepWizard from "@/components/booking/StepWizard";
import FloatingElements from "@/components/ui/FloatingElements";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden font-cairo text-foreground selection:bg-primary/30">
      <FloatingElements />

      {/* Header */}
      <header className="relative z-10 py-12 text-center">
        <div className="mb-4 flex flex-col items-center justify-center space-y-4">
          {/* Logo or Title Area */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <h1 className="relative text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary to-[#FDF8F0] drop-shadow-[0_2px_10px_rgba(245,166,35,0.3)]">
              خيمة قعدة زمان
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto font-medium">
            أجواء رمضانية ساحرة .. في قلب التاريخ
          </p>
        </div>
      </header>

      <div className="relative z-10">
        <StepWizard />
      </div>
    </main>
  );
}
