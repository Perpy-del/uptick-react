import CategoryComponent from "./components/CategoryComponent"
import HeroComponent from "./components/HeroComponent"
import NavBar from "./components/NavBar"
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-slate-50 text-black dark:bg-[#212529] dark:text-white">
      <NavBar />
      <HeroComponent />
      <CategoryComponent />
      </div>
    </ThemeProvider>
  )
}

export default App
