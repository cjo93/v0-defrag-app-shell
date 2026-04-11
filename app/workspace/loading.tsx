export default function WorkspaceLoading() {
  return (
    <div className="min-h-screen bg-[#05060a] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5 animate-pulse">
        <div className="h-24 rounded-[1.8rem] border border-white/8 bg-white/[0.04]" />
        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="h-[36rem] rounded-[1.8rem] border border-white/8 bg-white/[0.04]" />
          <div className="h-[36rem] rounded-[1.8rem] border border-white/8 bg-white/[0.04]" />
        </div>
      </div>
    </div>
  )
}
