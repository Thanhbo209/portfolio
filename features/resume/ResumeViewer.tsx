"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowSquareOutIcon,
  DownloadSimpleIcon,
  PrinterIcon,
} from "@phosphor-icons/react/dist/ssr";

import { buttonHover, buttonPressEffect, TRANSITIONS } from "@/lib/motion/variants";

interface ResumeViewerProps {
  pdfUrl: string;
}

const PRIMARY_BUTTON =
  "flex w-full items-center justify-center gap-2 bg-foreground px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-accent/90 hover:text-foreground sm:w-auto";

const OUTLINE_BUTTON =
  "flex w-full items-center justify-center gap-2 border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground sm:w-auto";

export function ResumeViewer({ pdfUrl }: ResumeViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  function handlePrint() {
    iframeRef.current?.contentWindow?.print();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <motion.a
          href={pdfUrl}
          download
          whileHover={buttonHover}
          whileTap={buttonPressEffect}
          className={PRIMARY_BUTTON}
        >
          <DownloadSimpleIcon className="size-4" weight="regular" />
          Download PDF
        </motion.a>
        <motion.a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={buttonHover}
          whileTap={buttonPressEffect}
          className={OUTLINE_BUTTON}
        >
          <ArrowSquareOutIcon className="size-4" weight="regular" />
          Open in New Tab
        </motion.a>
        <motion.button
          type="button"
          onClick={handlePrint}
          whileHover={buttonHover}
          whileTap={buttonPressEffect}
          className={OUTLINE_BUTTON}
        >
          <PrinterIcon className="size-4" weight="regular" />
          Print Resume
        </motion.button>
      </div>

      <div className="relative min-h-[80vh] w-full overflow-hidden rounded-md border border-border bg-card">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-foreground" />
            <p className="text-sm text-muted-foreground">
              Loading resume preview...
            </p>
          </div>
        )}
        <motion.iframe
          ref={iframeRef}
          src={pdfUrl}
          title="Resume preview"
          onLoad={() => setIsLoaded(true)}
          initial={false}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={TRANSITIONS.normal}
          className="h-full min-h-[80vh] w-full"
        />
      </div>
    </div>
  );
}
