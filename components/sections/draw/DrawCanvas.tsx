"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Pen, Eraser, Trash2, Send, Palette } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Curated premium color palette
const PRESET_COLORS = [
  { name: "Black", value: "#0b0f19" },
  { name: "Purple", value: "#a855f7" },
  { name: "Neon Blue", value: "#3b82f6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Green", value: "#10b981" },
  { name: "Yellow", value: "#f59e0b" },
  { name: "Pink", value: "#ec4899" },
  { name: "Red", value: "#ef4444" },
];

export default function DrawCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3b82f6");
  const [size, setSize] = useState(6);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // We set a fixed internal coordinate space for high-quality drawings
  // and scale the canvas elements dynamically using CSS.
  const INTERNAL_WIDTH = 700;
  const INTERNAL_HEIGHT = 500;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill background with solid white inside the image data
    // to prevent transparency issues when saving
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, INTERNAL_WIDTH, INTERNAL_HEIGHT);
  }, []);

  const getPoint = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Scale coordinates correctly between screen bounding rect and internal coordinate space
    const scaleX = INTERNAL_WIDTH / rect.width;
    const scaleY = INTERNAL_HEIGHT / rect.height;

    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.nativeEvent.clientX - rect.left) * scaleX,
      y: (e.nativeEvent.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if ("touches" in e) {
      // Prevent scrolling while drawing on mobile
      if (e.cancelable) e.preventDefault();
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const point = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    
    // Smooth drawing settings
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    setIsDrawing(true);
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;

    if ("touches" in e) {
      if (e.cancelable) e.preventDefault();
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "#ffffff"; // Eraser draws white over background
      ctx.lineWidth = size * 3; // Wider eraser
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    }

    const point = getPoint(e);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const clearCanvas = (notify = true) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (notify) {
      toast.info("Canvas cleared!", {
        position: "top-right",
        theme: "dark",
        autoClose: 1500,
      });
    }
  };

  const submitDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check if the canvas has any drawing (not just solid white)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let hasDrawing = false;
    
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      
      // If any pixel is not pure white (#ffffff)
      if (r !== 255 || g !== 255 || b !== 255) {
        hasDrawing = true;
        break;
      }
    }

    if (!hasDrawing) {
      toast.warning("Please draw something first!", {
        position: "top-right",
        theme: "dark",
        autoClose: 2000,
      });
      return;
    }

    setIsSubmitting(true);
    const image = canvas.toDataURL("image/png");

    try {
      const response = await fetch("/api/draw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit drawing");
      }

      toast.success("Your artwork is pinned on the gallery! 🎨✨", {
        position: "top-right",
        theme: "dark",
        autoClose: 3000,
      });
      clearCanvas(false);
      
      // Force trigger gallery reload if on the same page
      window.dispatchEvent(new Event("new-drawing-submitted"));
    } catch (error) {
      toast.error("Failed to send artwork. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full" ref={containerRef}>
      <div className="w-full glass-subtle p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => setTool("pen")}
            variant={tool === "pen" ? "primary" : "ghost"}
            size="sm"
            aria-pressed={tool === "pen"}
          >
            <Pen className="w-4 h-4" />
            Pen
          </Button>
          
          <Button
            type="button"
            onClick={() => setTool("eraser")}
            variant={tool === "eraser" ? "primary" : "ghost"}
            size="sm"
            aria-pressed={tool === "eraser"}
          >
            <Eraser className="w-4 h-4" />
            Eraser
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {tool === "pen" ? (
              <motion.div
                key="colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center flex-wrap gap-2 justify-center"
              >
                {PRESET_COLORS.map((c) => (
                  <motion.button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    style={{ backgroundColor: c.value }}
                    whileHover={{ y: -3, scale: 1.16 }}
                    whileTap={{ scale: 0.92 }}
                    className={`size-7 cursor-pointer rounded-full border shadow-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring/70 ${
                      color === c.value
                        ? "ring-2 ring-blue-500 ring-offset-2 scale-110 border-white"
                        : "border-border/60"
                    }`}
                    aria-label={`Use ${c.name} color`}
                    title={c.name}
                  />
                ))}

                <div className="relative flex size-7 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 shadow-sm transition-transform hover:-translate-y-0.5 hover:scale-110">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer scale-150"
                    aria-label="Use custom color"
                    title="Custom color"
                  />
                  <Palette className="w-3.5 h-3.5 text-white pointer-events-none" />
                </div>
              </motion.div>
            ) : (
              <motion.span
                key="eraser-note"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Eraser Tool Active
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Size Slider & Clear Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground select-none">
              Size
            </span>
            <input
              type="range"
              min={2}
              max={30}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="h-1.5 w-20 cursor-pointer appearance-none rounded-lg bg-border accent-emerald-500 sm:w-28"
              aria-label="Brush size"
            />
            <span className="text-xs font-bold text-foreground w-5 text-center">
              {size}
            </span>
          </div>

          <Button
            type="button"
            onClick={() => clearCanvas()}
            variant="outline"
            size="sm"
            className="text-xs uppercase tracking-wider"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </Button>
        </div>
      </div>

      <div className="relative aspect-[7/5] w-full max-w-2xl overflow-hidden rounded-lg border-4 border-slate-900 bg-white p-0.5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.28)]">
        <canvas
          ref={canvasRef}
          width={INTERNAL_WIDTH}
          height={INTERNAL_HEIGHT}
          className={`w-full h-full bg-white touch-none ${
            tool === "eraser" ? "cursor-cell" : "cursor-crosshair"
          }`}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>

      <Button
        type="button"
        onClick={submitDrawing}
        disabled={isSubmitting}
        variant="glow"
        size="lg"
        className="min-w-48"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {isSubmitting ? "Sending Art..." : "Pin to Gallery"}
      </Button>
    </div>
  );
}

