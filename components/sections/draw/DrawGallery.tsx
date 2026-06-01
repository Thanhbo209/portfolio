"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { scaleIn } from "@/components/motion/variants";
import { Button } from "@/components/ui/button";
import { ImageIcon, PencilLine } from "lucide-react";

interface Drawing {
  _id: string;
  image: string;
  x?: number;
  y?: number;
  rotation?: number;
}

interface DraggableDrawing extends Drawing {
  x: number;
  y: number;
  rotation: number;
}

export default function DrawGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [drawings, setDrawings] = useState<DraggableDrawing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDrawings = () => {
    fetch("/api/draw")
      .then((res) => res.json())
      .then((data: Drawing[]) => {
        const positioned = data.map((d) => {
          // Cache position parameters if not already assigned
          return {
            ...d,
            // Keeping them spaced within the board safely
            x: d.x ?? Math.floor(Math.random() * 65 + 10),
            y: d.y ?? Math.floor(Math.random() * 50 + 15),
            rotation: d.rotation ?? Math.floor(Math.random() * 24 - 12),
          };
        });
        setDrawings(positioned);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchDrawings();

    // Auto-refresh gallery in real-time when a new drawing is successfully submitted!
    window.addEventListener("new-drawing-submitted", fetchDrawings);
    return () => {
      window.removeEventListener("new-drawing-submitted", fetchDrawings);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="h-12 w-12 rounded-full border-4 border-muted border-t-emerald-500 animate-spin" />
          <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
            Curating gallery...
          </p>
        </motion.div>
      </div>
    );
  }

  if (drawings.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border p-8 glass-subtle">
        <div className="text-center max-w-sm">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/10 text-emerald-500">
            <ImageIcon className="size-8" />
          </div>
          <p className="text-foreground font-bold text-lg">No drawings yet</p>
          <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">
            Be the first visitor to pin a sketch to the board.
          </p>
          <Button className="mt-5" variant="outline" asChild>
            <a href="#draw">
              <PencilLine className="size-4" />
              Open Canvas
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-glow mb-3 block">
          Community Board
        </span>
        <h2 className="heading text-foreground mb-2">Visitor Gallery</h2>
        <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider">
          {drawings.length} {drawings.length === 1 ? "piece" : "pieces"} of visitor art
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative h-[32rem] w-full cursor-grab overflow-hidden rounded-lg border border-border/80 bg-[#030712] shadow-2xl active:cursor-grabbing sm:h-[42rem]"
      >
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, #a855f7 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-sky-400/35 to-transparent" />

        <AnimatePresence>
          {drawings.map((drawing, index) => (
            <motion.div
              key={drawing._id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.06}
              dragMomentum={true}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
              whileHover={{
                y: -6,
                rotate: drawing.rotation * 0.45,
                scale: 1.03,
              }}
              whileDrag={{ 
                scale: 1.08, 
                rotate: 0,
                zIndex: 100,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
              }}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="absolute w-36 select-none rounded-lg border border-slate-200/50 bg-white p-2 pb-5 text-slate-800 shadow-md transition-shadow hover:shadow-xl sm:w-44"
              style={{
                left: `${drawing.x}%`,
                top: `${drawing.y}%`,
                transform: `rotate(${drawing.rotation}deg)`,
                zIndex: index + 10,
              }}
            >
              {/* Polaroid pushpin or tape decoration */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-blue-500/15 backdrop-blur-2xs border border-blue-500/20 rotate-[-5deg] rounded-xs opacity-80" />

              <div className="relative w-full aspect-square bg-[#fafafc] rounded-xs border border-slate-200/80 overflow-hidden">
                <Image
                  src={drawing.image}
                  alt="Visitor drawing"
                  fill
                  className="object-contain pointer-events-none"
                  sizes="(max-width: 640px) 144px, 176px"
                  priority={index > drawings.length - 6} // Prioritize last added ones
                  draggable={false}
                />
              </div>

              <div className="mt-3.5 text-center flex flex-col items-center">
                <span 
                  className="font-medium text-[10px] sm:text-xs text-slate-500 font-mono"
                  style={{ fontFamily: "'Architects Daughter', 'Caveat', cursive, sans-serif" }}
                >
                  ✨ Piece #{drawings.length - index}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

