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
      {/* <!-- Top Navigation Bar --> */}
      <nav className="fixed top-0 w-full z-50 bg-[#0e0e10]/80 backdrop-blur-xl flex justify-between items-center px-8 h-16 w-full font-manrope tracking-tight">
        <div className="text-xl font-bold tracking-widest text-[#e6e4ec]">Ethereal AI</div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-[#c0c1ff] border-b-2 border-[#c0c1ff] pb-1" href="#">Workspace</a>
          <a className="text-[#e6e4ec]/60 hover:text-[#c0c1ff] transition-colors duration-300" href="#">Settings</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#c0c1ff] hover:opacity-80 transition-all">
            <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
          </button>
        </div>
      </nav>
      <main className="relative pt-16">
        {/* <!-- Hero Section --> */}
        <section className="relative min-h-[921px] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          {/* <!-- Background Visual Decoration (The Void Aesthetic) --> */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 max-w-4xl">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-6 block">Sentient Interface</span>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[0.9]">
              The digital <br /> sanctuary for <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-tertiary">thought.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Ethereal AI transcends simple automation, providing a high-end editorial experience for the next generation of intelligence.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/10">
                Get Started
              </button>
              <button className="px-10 py-4 border border-outline-variant/30 text-on-surface font-medium rounded-full hover:bg-surface-container-high transition-colors">
                Explore Interface
              </button>
            </div>
          </div>
          {/* <!-- Subtle AI Illustration Placeholder --> */}
          <div className="mt-20 relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-outline-variant/10">
            <img className="w-full h-full object-cover grayscale opacity-60" data-alt="Abstract minimalist digital landscape with flowing ethereal lines and dark obsidian textures with subtle lavender light glows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAofyOhUWOm9oUzKzQQCrQaYVcdJUlEJ6oZH5FfkZw02SnOFedxoxBBhsziqVW-mkoXbgfOF-Pvo1uRib7Z0sS3VYbz2-Iv19Vi8umWzRssG_EOHEqHT4KE9HkKWYSTFv5eNvIAjYEtmuMXmDTypROz2giOVjTWSGyiXeQsVubK_S50Hv9uJg8DmroTgpnqg7h9eCbuyA0k4TkuLxbe9oTsgp67ec2w51GQNliPiwVnDpXKHpusMabw-soGRmW-CREWCq1NBQWp5s" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
            {/* <!-- Interactive Point Simulation --> */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 animate-pulse blur-xl"></div>
              <div className="absolute w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_rgba(192,193,255,0.8)]"></div>
            </div>
          </div>
        </section>
        {/* <!-- Feature Section (Bento Grid) --> */}
        <section className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* <!-- Large Feature: Intelligence --> */}
            <div className="md:col-span-8 bg-surface-container-low p-10 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <span className="material-symbols-outlined text-tertiary text-6xl opacity-20" data-icon="auto_awesome">auto_awesome</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">Profound Intelligence</h3>
              <p className="text-on-surface-variant max-w-md mb-8 leading-relaxed">
                Moving beyond pattern matching. Our sentient architecture processes context with the nuance of human intuition, delivering responses that feel authentic and deeply considered.
              </p>
              <div className="flex gap-2">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <div className="h-1 w-4 bg-outline-variant rounded-full"></div>
                <div className="h-1 w-4 bg-outline-variant rounded-full"></div>
              </div>
            </div>
            {/* <!-- Small Feature: Speed --> */}
            <div className="md:col-span-4 bg-surface-container p-10 rounded-xl flex flex-col justify-between hover:bg-surface-container-high transition-colors cursor-default">
              <span className="material-symbols-outlined text-primary text-4xl mb-6" data-icon="bolt">bolt</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">Instant Flux</h3>
                <p className="text-sm text-on-surface-variant">Zero-latency generation that matches the speed of your thought process.</p>
              </div>
            </div>
            {/* <!-- Small Feature: Privacy --> */}
            <div className="md:col-span-4 bg-surface-container p-10 rounded-xl flex flex-col justify-between hover:bg-surface-container-high transition-colors cursor-default">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6" data-icon="shield_lock">shield_lock</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">The Vault</h3>
                <p className="text-sm text-on-surface-variant">Your data is yours. Encrypted within an obsidian-grade digital fortress.</p>
              </div>
            </div>
            {/* <!-- Mid Feature: Asymmetric Layout --> */}
            <div className="md:col-span-8 bg-surface-container-low p-10 rounded-xl flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4">Editorial Polish</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Every interaction is formatted for clarity. From complex code blocks to long-form prose, the typography prioritizes your focus.
                </p>
              </div>
              <div className="flex-1 w-full bg-surface-container-lowest p-6 rounded-lg font-mono text-xs border border-outline-variant/10">
                <div className="flex gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-error-dim"></div>
                  <div className="w-2 h-2 rounded-full bg-primary-dim"></div>
                  <div className="w-2 h-2 rounded-full bg-tertiary-dim"></div>
                </div>
                <div className="text-primary-dim opacity-80">const <span className="text-tertiary">intelligence</span> = new Ethereal();</div>
                <div className="text-on-surface-variant mt-2">intelligence.initiate</div>
              </div>
            </div>
          </div>
        </section>
        {/* // <!-- Content Section: Tonal Shift --> */}
        <section className="bg-surface-container-low py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Redefining the Interface of Tomorrow.</h2>
            <p className="text-on-surface-variant text-lg mb-12">
              Join the waitlist for the most sophisticated AI experience ever built. A digital sanctuary where clarity meets complexity.
            </p>
            <div className="inline-flex items-center p-1 bg-surface rounded-full border border-outline-variant/20 max-w-md w-full">
              <input className="bg-transparent border-none focus:ring-0 px-6 py-2 flex-1 text-on-surface text-sm" placeholder="Enter your email" type="email" />
              <button className="bg-on-surface text-surface px-6 py-3 rounded-full text-sm font-bold hover:bg-primary transition-colors">
                Join Waitlist
              </button>
            </div>
          </div>
        </section>
      </main>
      {/* // <!-- Footer --> */}
      <footer className="bg-[#0e0e10] w-full py-12 flex flex-col items-center justify-center gap-4 w-full border-t border-[#47474d]/15 font-inter text-xs uppercase tracking-widest">
        <div className="flex gap-8 mb-4">
          <a className="text-[#e6e4ec]/30 hover:text-[#e6e4ec] transition-colors" href="#">Privacy</a>
          <a className="text-[#e6e4ec]/30 hover:text-[#e6e4ec] transition-colors" href="#">Terms</a>
          <a className="text-[#e6e4ec]/30 hover:text-[#e6e4ec] transition-colors" href="#">API</a>
        </div>
        <div className="text-[#e6e4ec]/30">
          © 2024 Ethereal Intelligence. Digital Sanctuary.
        </div>
      </footer>
      {/* // <!-- Side Navigation Bar (Hidden on Mobile) --> */}
      <aside className="hidden lg:flex flex-col py-6 px-4 gap-2 h-screen w-64 fixed left-0 top-0 bg-[#131316] font-inter text-sm z-[60] transform -translate-x-full transition-transform duration-300 hover:translate-x-0 group">
        {/* <!-- Floating Trigger --> */}
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-surface-container px-1 py-4 rounded-r-lg cursor-pointer">
          <span className="material-symbols-outlined text-primary-dim text-xs" data-icon="chevron_right">chevron_right</span>
        </div>
        <div className="mb-10 px-4">
          <div className="text-lg font-semibold text-[#e6e4ec]">The Void</div>
          <div className="text-[10px] text-on-surface-variant tracking-widest uppercase opacity-60">Sentient Interface</div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <button className="flex items-center gap-3 py-3 px-4 bg-[#25252b] text-[#e6e4ec] border-l-2 border-[#c0c1ff] rounded-r-lg">
            <span className="material-symbols-outlined text-lg" data-icon="add_circle">add_circle</span>
            New Chat
          </button>
          <button className="flex items-center gap-3 py-3 px-4 text-[#e6e4ec]/40 hover:bg-[#19191d] hover:text-[#e6e4ec] transition-all duration-200">
            <span className="material-symbols-outlined text-lg" data-icon="history">history</span>
            History
          </button>
          <button className="flex items-center gap-3 py-3 px-4 text-[#e6e4ec]/40 hover:bg-[#19191d] hover:text-[#e6e4ec] transition-all duration-200">
            <span className="material-symbols-outlined text-lg" data-icon="auto_awesome">auto_awesome</span>
            Templates
          </button>
          <button className="flex items-center gap-3 py-3 px-4 text-[#e6e4ec]/40 hover:bg-[#19191d] hover:text-[#e6e4ec] transition-all duration-200">
            <span className="material-symbols-outlined text-lg" data-icon="insights">insights</span>
            Analytics
          </button>
        </div>
        <div className="mt-auto border-t border-outline-variant/10 pt-6 px-4">
          <button className="w-full py-3 bg-primary-container text-on-primary-container rounded-lg text-xs font-bold mb-4 active:scale-95 transition-transform">
            Upgrade to Pro
          </button>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-3 text-[#e6e4ec]/40 hover:text-[#e6e4ec] py-1">
              <span className="material-symbols-outlined text-sm" data-icon="help_outline">help_outline</span> Help
            </button>
            <button className="flex items-center gap-3 text-[#e6e4ec]/40 hover:text-[#e6e4ec] py-1">
              <span className="material-symbols-outlined text-sm" data-icon="logout">logout</span> Logout
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}