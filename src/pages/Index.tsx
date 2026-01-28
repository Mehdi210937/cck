import { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DesktopGrid, MobileGrid } from "@/components/home/ContentGrid";
import { ChevronDown } from "lucide-react";
import banniereCck from "@/assets/banniere-cck.mp4";
import VideoMirror from "@/components/VideoMirror";

const Index = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Forcer la lecture de la vidéo
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // Obligatoire pour l'autoplay
      video.playsInline = true;

      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log("Autoplay bloqué, tentative avec interaction utilisateur");
          // Fallback : jouer au premier clic/touch sur la page
          const handleInteraction = async () => {
            try {
              await video.play();
              document.removeEventListener("click", handleInteraction);
              document.removeEventListener("touchstart", handleInteraction);
            } catch (e) {
              console.error("Impossible de lire la vidéo", e);
            }
          };
          document.addEventListener("click", handleInteraction, { once: true });
          document.addEventListener("touchstart", handleInteraction, { once: true });
        }
      };

      playVideo();
    }
  }, []);

  const scrollToContent = () => {
    if (contentRef.current) {
      const elementPosition = contentRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 80;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContentVisible(true);
        }
      },
      { threshold: 0.1 },
    );
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Video Section - Desktop */}
      <section className="hidden md:flex relative h-screen w-full items-center justify-center bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={banniereCck}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* ... reste du code */}
      </section>
      {/* ... reste du composant */}
    </div>
  );
};

export default Index;
