import { SpiderCursor } from "../components/SpiderCursor.jsx";
import TextArcEffect from "../components/TextArcEffect.jsx";

export default function Root() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <SpiderCursor />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[100px]" />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center">
        <section className="flex min-h-screen items-center justify-center">
          <TextArcEffect />
        </section>
      </div>
    </main>
  );
}
