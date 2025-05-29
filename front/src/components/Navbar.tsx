import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="
      sticky top-0 z-10

      bg-gradient-to-r from-blue-500 to-purple-600
      shadow-lg border-b border-white/20

      backdrop-blur-sm bg-white/10

      transition-shadow duration-300 ease-in-out
      h-20 p-6

      flex justify-between items-center
    ">
      <h1 className="text-xl font-bold text-[clamp(1rem,1.5vw,2rem)]">
        ToDo
      </h1>
    </nav>
  );
}