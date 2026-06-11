import { Spinner } from "./spinner"

export default function DefaultLoadingScreen({ text }: { text?: string }) {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4">
      <Spinner />
      {text && <p className="text-muted-foreground">{text}</p>}
    </div>
  )
}
