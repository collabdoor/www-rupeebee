"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play, Loader2 } from "lucide-react";

interface VideoPlayerProps {
  googleDriveUrl: string;
  title?: string;
  description?: string;
}

/**
 * Converts a Google Drive shareable link to an embeddable iframe URL
 * @param url - Google Drive shareable URL
 * @returns Embeddable iframe URL
 */
function convertGoogleDriveUrl(url: string): string {
  // Extract file ID from various Google Drive URL formats
  let fileId = "";

  // Format: https://drive.google.com/file/d/FILE_ID/view
  const match1 = url.match(/\/file\/d\/([^/]+)/);
  if (match1) {
    fileId = match1[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  const match2 = url.match(/[?&]id=([^&]+)/);
  if (match2) {
    fileId = match2[1];
  }

  // If fileId is found, return the embeddable URL
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  // If already in preview format, return as is
  if (url.includes("/preview")) {
    return url;
  }

  // Fallback: return original URL
  return url;
}

export default function VideoPlayer({
  googleDriveUrl,
  title = "Watch Our Video",
  description = "Learn more about what we offer",
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const embedUrl = convertGoogleDriveUrl(googleDriveUrl);

  return (
    <section className="py-20 bg-gradient-to-bl from-yellow-50 via-white to-yellow-50">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full"
            >
              <Play className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Video Preview
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          </div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
          >
            {/* Aspect ratio container (16:9) */}
            <div className="relative w-full pb-[56.25%]">
              {/* Loading indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto" />
                    <p className="text-gray-400">Loading video...</p>
                  </div>
                </div>
              )}

              {/* Google Drive iframe */}
              <iframe
                src={embedUrl}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
                title={title}
              />
            </div>

            {/* Decorative gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
