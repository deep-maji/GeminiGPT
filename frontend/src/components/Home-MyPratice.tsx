import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getLogout } from "../apis/Auth";

export default function Home() {

  const { auth, setAuth } = useAuth();

  const handleLogOut = async () => {
    try {
      const respone = await getLogout();
      setAuth(null);
    } catch (error) {
      console.log("Logout error : ", error);
    }
  }
  return (
    <div className="bg-surface text-on-surface overflow-x-hidden">
      {/* Top Nagivation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface-dim/80 backdrop-blur-xl flex justify-between items-center px-8 h-16 font-manrope tracking-tight">
        <div>Ethereal AI</div>
        <div>
          <button className="p-2 text-[#c0c1ff] hover:opacity-80 transition-all">Sign in</button>
        </div>
      </nav>

      <main className="relative pt-16">
        {/* <!-- Hero Section --> */}
        <section className="relative min-h-230.25 flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          {/* <!-- Background Visual Decoration (The Void Aesthetic) --> */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 rounded-full blur-[120px]"></div>
            <div className="absolute top-1/3 left-1/4 bg-tertiary/5 w-100 h-100 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 max-w-4xl">
            <span className="font-label text-xs uppercase tracking-[0.3rem] text-primary mb-6 block">Sentient Interface</span>
            <h1 className="text-5xl md:text8xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[0.9]">
              The digital <br /> sanctuary for <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-tertiary">thought.</span>
            </h1>
            <p></p>
            <div>
              <button></button>
              <button></button>
            </div>
          </div>
          <div></div>
        </section>
        <section></section>
        <section></section>
      </main>
      <footer></footer>
      <aside></aside>
    </div>
  )
}