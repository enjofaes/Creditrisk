import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Pyodide SharedArrayBuffer support
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
  // Silence Turbopack warning while keeping compatibility
  turbopack: {},
};

export default nextConfig;
