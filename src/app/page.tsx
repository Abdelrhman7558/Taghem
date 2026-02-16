import StepWizard from "@/components/booking/StepWizard";

export default function Home() {
  return (
    <main className="min-h-screen relative font-cairo text-foreground selection:bg-primary/30">

      {/* Header */}
      <header className="relative z-10 pt-10 pb-6 text-center">
        <div className="mb-6 flex flex-col items-center justify-center space-y-4">
          {/* Title — styled to match logo calligraphy */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-8 bg-[radial-gradient(ellipse,rgba(212,149,43,0.15)_0%,transparent_70%)] blur-2xl rounded-full" />

            <div className="relative text-center">
              <span className="block text-xl md:text-2xl text-white/70 font-[var(--font-ruqaa)] mb-1">خيمة</span>
              <h1 className="font-[var(--font-ruqaa)] text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FBF5E9] via-[#E8B84A] to-[#C69320] drop-shadow-[0_2px_10px_rgba(212,149,43,0.5)]" style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.2)' }}>
                قعدة زمان
              </h1>
            </div>
          </div>

          {/* Decorative golden divider */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-l from-primary/60 to-transparent" />
            <div className="w-2 h-2 rotate-45 bg-primary/60 rounded-sm" />
            <div className="h-px w-12 bg-gradient-to-r from-primary/60 to-transparent" />
          </div>

          <p className="text-lg md:text-xl max-w-md mx-auto font-medium px-4 py-2 rounded-xl backdrop-blur-sm bg-black/20 text-white/90">
            أجواء رمضانية ساحرة
          </p>
        </div>
      </header>

      <div className="relative z-10">
        <StepWizard />
      </div>
    </main>
  );
}


