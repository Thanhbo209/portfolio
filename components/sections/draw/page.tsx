"use client";
import DrawCanvas from "@/components/sections/draw/DrawCanvas";

export default function DrawPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold bg-blue-300 bg-clip-text text-transparent">
            Draw Something For Me
          </h1>

          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Leave your creative mark on my portfolio. Every drawing makes it
            special!
          </p>
        </div>

        {/* Canvas Container */}
        <div className="bg-background rounded-2xl shadow-2xl p-6 md:p-8 border ">
          <DrawCanvas />
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
