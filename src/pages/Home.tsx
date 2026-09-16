import { Code2, Palette, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
          <Code2 className="w-8 h-8 text-white" />
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Your App Starts Here
          </h1>
          <p className="text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
            A blank canvas ready for your ideas. Use the AI chat to describe what you want to build.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="w-full sm:w-auto px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25 flex items-center justify-center gap-2">
            Get Started
          </button>
          <button className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl font-medium transition-all border border-white/10">
            Learn More
          </button>
        </div>

        {/* Feature hints */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {[
            { icon: Code2, label: 'React + TypeScript' },
            { icon: Zap, label: 'Vite + HMR' },
            { icon: Palette, label: 'Tailwind CSS' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/5"
            >
              <Icon className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}