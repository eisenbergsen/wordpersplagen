import Link from "next/link"

interface LogoProps {
  size?: "small" | "medium" | "large"
}

export default function Logo({ size = "medium" }: LogoProps) {
  const sizeClasses = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-3xl",
  }

  return (
    <Link href="/" className="flex items-center">
      <div className="text-red-500 mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={size === "small" ? "w-6 h-6" : size === "medium" ? "w-8 h-8" : "w-10 h-10"}
        >
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 19.5v-15ZM6.5 4a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5h-11Z" />
          <path d="M7 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z" />
          <path d="M8.75 5.5a.75.75 0 0 0-1.5 0v13a.75.75 0 0 0 1.5 0v-13Z" />
        </svg>
      </div>
      <span className={`font-bold ${sizeClasses[size]} text-white`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">AI</span>
        <span className="mx-1">Product</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">Tools</span>
      </span>
    </Link>
  )
}
