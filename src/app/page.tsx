import StepWizard from "@/components/booking/StepWizard";
import FloatingElements from "@/components/ui/FloatingElements";

export default function Home() {
  return (
    <main className="min-h-screen relative font-cairo text-foreground selection:bg-primary/30">
      <FloatingElements />

      {/* Header */}
      <header className="relative z-10 pt-16 pb-8 text-center">
        <div className="mb-6 flex flex-col items-center justify-center space-y-5">
          {/* Decorative arch glow frame */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-8 bg-[radial-gradient(ellipse,rgba(212,149,43,0.15)_0%,transparent_70%)] blur-2xl rounded-full" />

            {/* Title */}
            <h1 className="relative font-amiri text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#D4952B] via-[#E8B84A] to-[#FAF0E0] drop-shadow-[0_2px_12px_rgba(212,149,43,0.4)]">
              خيمة قعدة زمان
            </h1>
          </div>

          {/* Decorative golden divider */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-l from-primary/60 to-transparent" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-sm" />
            <div className="h-px w-12 bg-gradient-to-r from-primary/60 to-transparent" />
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
