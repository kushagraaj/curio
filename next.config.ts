import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingIncludes: { '/**': ['./registry/**/*'] },
}

export default nextConfig
