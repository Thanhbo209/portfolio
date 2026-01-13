"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Drawing {
  _id: string;
  image: string;
  x?: number;
  y?: number;
}

interface DraggableDrawing extends Drawing {
  x: number;
  y: number;
}

export default function DrawGallery() {
  const [drawings, setDrawings] = useState<DraggableDrawing[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("/api/draw")
      .then((res) => res.json())
      .then((data: Drawing[]) => {
        const positioned = data.map((d, i) => ({
          ...d,
          x: d.x ?? Math.random() * 60 + 5,
          y: d.y ?? Math.random() * 60 + 5,
        }));
        setDrawings(positioned);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    const drawing = drawings.find((d) => d._id === id);
    if (!drawing) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const parent = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!parent) return;

    setDraggedId(id);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedId) return;

    const container = e.currentTarget.getBoundingClientRect();
    const x =
      ((e.clientX - container.left - dragOffset.x) / container.width) * 100;
    const y =
      ((e.clientY - container.top - dragOffset.y) / container.height) * 100;

    setDrawings((prev) =>
      prev.map((d) =>
        d._id === draggedId
          ? {
              ...d,
              x: Math.max(0, Math.min(90, x)),
              y: Math.max(0, Math.min(90, y)),
            }
          : d
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-125">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin" />
          <p className="text-gray-600 text-sm">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (drawings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-125">
        <div className="text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-500 text-lg font-medium">No drawings yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Start creating to see your artwork here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <h2 className="heading text-blue-300">Gallery</h2>
        <p className="text-gray-600 mb-1">
          {drawings.length} {drawings.length === 1 ? "drawing" : "drawings"}
        </p>
      </div>

      <div
        className="relative w-full h-150 bg-background rounded-2xl border shadow-xl overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, #9333ea 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        {drawings.map((drawing) => (
          <div
            key={drawing._id}
            className={`absolute w-40 border-6 border-blue-300 rounded-xl h-40 cursor-move transition-shadow ${
              draggedId === drawing._id
                ? "z-50 shadow-2xl scale-110"
                : "z-10 shadow-lg hover:shadow-xl"
            }`}
            style={{
              left: `${drawing.x}%`,
              top: `${drawing.y}%`,
              transition:
                draggedId === drawing._id
                  ? "none"
                  : "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseDown={(e) => handleMouseDown(e, drawing._id)}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden border-4 border-white bg-white transform rotate-0 hover:rotate-1 transition-transform">
              <Image
                src={drawing.image}
                alt="User drawing"
                fill
                className="object-cover pointer-events-none"
                sizes="160px"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
