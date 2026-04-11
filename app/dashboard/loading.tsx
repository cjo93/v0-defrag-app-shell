export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#05060a] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5 animate-pulse">
        <div className="h-24 rounded-[1.8rem] border border-white/8 bg-white/[0.04]" />
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="h-56 rounded-[1.8rem] border border-white/8 bg-white/[0.04]" />
          <div className="h-56 rounded-[1.8rem] border border-white/8 bg-white/[0.04]" />
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="h-72 rounded-[1.8rem] border border-white/8 bg-white/[0.04]" />
          <div className="h-72 rounded-[1.8rem] border border-white/8 bg-white/[0.04]" />
        </div>
      </div>
    </div>
  )
}
