import React, { useState, useEffect } from "react";
import { FaJava, FaDocker, FaReact, FaPython, FaGithub } from "react-icons/fa";
import { SiSpring, SiInsomnia, SiPostgresql } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import img from "../assets/imgs/myimg.png";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(100);
  
  
  const [isVisible, setIsVisible] = useState(true);
  
  const [pendingIndex, setPendingIndex] = useState(null);

  const topics = [
    {
      title: "Hello",
      description:
      "I'm Vitor Teodoro, a brazilian Computer Science student at State University of Maringá (UEM).",
    },
    {
      title: "Goals",
      description:
        "I aim for a Software Engineer internship opportunity to build robust backend solutions, focusing on scalable and effective code."
    },
    {
      title: "Stack",
      description: "", 
      stack: [
        { name: "Java", Icon: FaJava, color: "#ED8B00" },
        { name: "Spring", Icon: SiSpring, color: "#6DB33F" },
        { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
        { name: "Docker", Icon: FaDocker, color: "#2496ED" },
        { name: "React", Icon: FaReact, color: "#61DAFB" },
        { name: "Tailwind", Icon: RiTailwindCssFill, color: "#06B6D4" },
        { name: "Python", Icon: FaPython, color: "#3776AB" },
        { name: "Insomnia", Icon: SiInsomnia, color: "#4000BF" },
        { name: "GitHub", Icon: FaGithub, color: "#ffffff" },
      ],
    },
  ];

  useEffect(() => {
    if (!isVisible) return;

    const updateInterval = 50;
    const timePerSlide = 7000;
    const decreaseAmount = 100 / (timePerSlide / updateInterval);

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          setIsVisible(false);
          return 0;
        }
        return prevProgress - decreaseAmount;
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, [isVisible]);  
  useEffect(() => {
    
    if (!isVisible) {
      const timeout = setTimeout(() => {
        setActiveIndex((current) => {
        
          return pendingIndex !== null ? pendingIndex : (current + 1) % topics.length;
        });
        
        setProgress(100);
        setPendingIndex(null); 
        setIsVisible(true); 
      }, 500); 

      return () => clearTimeout(timeout);
    }
  }, [isVisible, pendingIndex, topics.length]);

  // 3. Manual Click Handler
  const handleManualChange = (index) => {
    if (index === activeIndex) return;
    setPendingIndex(index); 
    setIsVisible(false);    
  };

  return (
    <div className="relative h-screen bg-[#0a0a0c] text-white overflow-hidden flex items-center px-5 md:px-20">
      {/* 1. Background Image Layer */}
      <div className="absolute top-0 right-0 w-[55%] md:w-[55%] h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent z-10" />
        <img
          src={img}
          alt="Vitor Teodoro"
          className="object-cover w-full h-full  grayscale opacity-80"
        />
      </div>

      {/* 2. Left Content Container */}
      <div className="relative z-10 max-w-xl flex flex-col mb-100 md:mb-0 justify-end md:justify-center h-full ">
        
        <div className={`transition-opacity duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
          
          <h1 className="text-4xl md:text-7xl font-semibold mb-2 md:mb-6 tracking-wide">
            {topics[activeIndex].title}
          </h1>
          
          <div className="w-8 md:w-12 h-0.5 md:h-1 bg-white mb-3 md:mb-8 rounded-full"></div>

          {topics[activeIndex].description && (
            <p className="text-gray-400 text-md md:text-lg leading-8 md:leading-relaxed font-light pr-8 min-h-[150px] md:min-h-[80px]">
              {topics[activeIndex].description}
            </p>
          )}

          {topics[activeIndex].stack && (
            <div className=" grid grid-cols-4 gap-6 animate-fade-in-up ">
              {topics[activeIndex].stack.map((tech, index) => (
                <div key={index} className="group relative flex flex-col items-center">
                  <div className="p-2 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-white/50 transition-all duration-300 hover:scale-110 hover:bg-gray-700/80 cursor-pointer">
                    <tech.Icon
                      className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ color: tech.color }}
                    />
                  </div>
                  <span className="absolute -bottom-5 opacity-0 group-hover:opacity-100 text-xs text-gray-300 transition-opacity duration-300 pointer-events-none">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          
        </div>

      </div>

      {/* 3. Right Navigation Bars */}
      <div className="absolute right-10 top- md:top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-20 items-end">
        {topics.map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-end cursor-pointer group"
            onClick={() => handleManualChange(index)} 
          >
            {index === activeIndex ? (
              <div className="h-[3px] w-5 md:w-10 bg-gray-800 rounded overflow-hidden">
                <div
                  className="h-full bg-white"
                  style={{
                    width: `${progress}%`,
                    transition: "width 50ms linear",
                  }}
                ></div>
              </div>
            ) : (
              <div className="h-0.75 w-4 md:w-8 bg-gray-700 rounded transition-all duration-300 group-hover:bg-gray-400 group-hover:w-6 md:group-hover:w-8"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
