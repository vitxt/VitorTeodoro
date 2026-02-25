import { useState } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

export default function NavBar() {
  const myEmail = "vitorteodorodev@gmail.com";

  const [copiedState, setCopiedState] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedState(type);

    setTimeout(() => {
      setCopiedState(null);
    }, 1500);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-6 md:px-10 py-6 z-50">
      <div className="text-md font-semibold tracking-[0.2em] text-gray-500">
        Vitor Teodoro
      </div>

      <div className="flex items-center space-x-8">
        <a
          href="https://www.linkedin.com/in/vitorteodorodev"
          target="_blank"
          rel="noopener noreferrer"
          className=" text-amber-50 md:text-black/45 hover:text-white transition-colors hover:scale-110 focus:outline-none"
        >
          <FaLinkedinIn className="w-6 h-6" />
        </a>

        <a
          href="https://github.com/vitxt"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-50 md:text-black/45 hover:text-white transition-colors hover:scale-110 focus:outline-none"
        >
          <FaGithub className="w-6 h-6" />
        </a>

        <div className="relative flex flex-col items-center">
          <button
            onClick={() => handleCopy(myEmail, "email")}
            className="text-amber-50 md:text-black/45 hover:text-white transition-colors hover:scale-110 focus:outline-none"
            title="Copy Email"
          >
            <MdAlternateEmail className="w-6 h-6 fill-current" />
          </button>

          {copiedState === "email" && (
            <span className="absolute -bottom-8 px-2 py-1 text-[0.7rem] md:text-xs text-white bg-gray-800 rounded shadow-lg animate-fade-in-up whitespace-nowrap">
              <span className="md:hidden">Copied!</span>
              <span className="hidden md:inline">Email Copied!</span>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
