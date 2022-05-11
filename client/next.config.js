/** @type {import('next').NextConfig} */
const strapiAPIUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [new URL(strapiAPIUrl).hostname],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
}

module.exports = nextConfig
