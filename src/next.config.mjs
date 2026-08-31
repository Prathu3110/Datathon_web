/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
]

/**
 * The inauguration route (/launch) needs the microphone for the spoken
 * approval step. `microphone=()` disables it for every origin INCLUDING our
 * own, and a Permissions-Policy denial cannot be overridden by the user
 * granting permission — the browser refuses before prompting.
 *
 * `(self)` re-enables it for our own origin only; third parties and embedded
 * contexts stay blocked exactly as before. Every other route keeps the strict
 * `microphone=()` policy untouched.
 */
const launchHeaders = securityHeaders.map((header) =>
  header.key === 'Permissions-Policy'
    ? {
        ...header,
        value: 'camera=(), microphone=(self), geolocation=(), browsing-topics=()',
      }
    : header
)

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  // Production security: disable browser source maps to protect source code
  productionBrowserSourceMaps: false,
  // Remove X-Powered-By header to hide server technology
  poweredByHeader: false,
  // Enable asset compression
  compress: true,
  reactStrictMode: true,

  // Apply enterprise security headers across all routes
  async headers() {
    return [
      // Most specific first: /launch relaxes ONLY the microphone directive.
      {
        source: '/launch',
        headers: launchHeaders,
      },
      // Everything else keeps the strict policy.
      {
        source: '/:path((?!launch$).*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
