import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Linkedin, Github, DiscIcon as Discord } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-background px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 text-center md:text-left md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2 justify-center md:justify-start">
            <Image src="/logo.gif" alt="Qubic Capital Logo" width={32} height={32} className="h-8 w-8" />
            <span className="text-lg font-bold text-white">Qubic Capital</span>
          </Link>
          <p className="mb-4 text-sm text-slate-400">
            Empowering our community to invest in premium assets through fractional ownership and decentralized finance.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              href="#"
              className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-purple-500/20 hover:text-purple-400"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-purple-500/20 hover:text-purple-400"
            >
              <Discord className="h-5 w-5" />
              <span className="sr-only">Discord</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-purple-500/20 hover:text-purple-400"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-purple-500/20 hover:text-purple-400"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Platform</h3>
          <ul className="space-y-2">
            {["How It Works", "Investments", "Tokenomics", "Roadmap", "FAQ"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-slate-400 transition-colors hover:text-purple-400">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
          <ul className="space-y-2">
            {["About Us", "Team", "Careers", "Partners", "Blog", "Contact"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-slate-400 transition-colors hover:text-purple-400">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Subscribe to our newsletter
          </h3>
          <div className="mb-4 text-sm text-slate-400">Get the latest updates and news directly to your inbox.</div>
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-purple-500"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
        <span>© {new Date().getFullYear()} Qubic Capital. All rights reserved.</span>
      </div>
    </footer>
  )
}
