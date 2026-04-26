/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent webpack from bundling native Node addons — they must be required
  // at runtime by the Node.js host, not inlined into the bundle.
  serverExternalPackages: ['better-sqlite3', 'better-auth'],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
}

module.exports = nextConfig
