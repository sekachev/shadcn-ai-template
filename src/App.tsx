import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import AIChat from "@/pages/ai-chat"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-svh bg-background">
        <div className="border-b">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">AI Chat</h1>
            </div>
            <ModeToggle />
          </div>
        </div>
        <AIChat />
      </div>
    </ThemeProvider>
  )
}

export default App
