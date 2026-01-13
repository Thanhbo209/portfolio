"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function DrawCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 650, height: 600 });

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const maxWidth = 650;
        const width = Math.min(containerWidth - 32, maxWidth);
        const height = Math.round(width * (600 / 650));
        setCanvasSize({ width, height });
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const startDraw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const point = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    setIsDrawing(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = size * 2;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    }

    ctx.lineCap = "round";
    const point = getPoint(e);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const getPoint = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      e.preventDefault();
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }

    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  const endDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    toast.info("Canvas cleared!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const submitDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if canvas is empty
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const isEmpty = !imageData.data.some((channel) => channel !== 0);

    if (isEmpty) {
      toast.warning("Please draw something first! 🎨", {
        position: "bottom-right",
        autoClose: 3000,
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

      toast.success("Your drawing has been sent! ❤️", {
        position: "bottom-right",
        autoClose: 3000,
      });
      clearCanvas();
    } catch (error) {
      toast.error("Failed to send drawing. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Tools */}
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {/* Tool Selection */}
        <div className="flex gap-2 border p-1 rounded-lg">
          <button
            onClick={() => setTool("pen")}
            className={`px-4 py-2 rounded-md transition-all ${
              tool === "pen"
                ? "bg-blue-300 shadow-sm text-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Pen
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`px-4 py-2 rounded-md transition-all ${
              tool === "eraser"
                ? "bg-blue-300 shadow-sm text-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Eraser
          </button>
        </div>

        {tool === "pen" && (
          <div className="flex items-center gap-2 px-4 py-2">
            <label className="text-sm">Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-9 h-9 cursor-pointer rounded border"
            />
          </div>
        )}

        {/* Size Slider */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
          <label className="text-sm">Size:</label>
          <input
            type="range"
            min={1}
            max={20}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm font-medium w-6">{size}</span>
        </div>

        <Button
          variant="outline"
          onClick={clearCanvas}
          className="border-gray-300"
        >
          Clear
        </Button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={400}
        height={350}
        className={`border-2 rounded-lg mb-3 bg-white shadow-lg ${
          tool === "eraser" ? "cursor-cell" : "cursor-crosshair"
        }`}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
      />

      <Button
        onClick={submitDrawing}
        variant="default"
        disabled={isSubmitting}
        className="min-w-50"
      >
        {isSubmitting ? "Sending..." : "Send to Portfolio"}
      </Button>
    </div>
  );
}
