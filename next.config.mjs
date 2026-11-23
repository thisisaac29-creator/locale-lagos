/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/media-loader.ts',
    deviceSizes: [360, 640, 960, 1440],
    imageSizes: [32, 64, 96, 128, 256],
  },
}
export default (phase) => ({ ...nextConfig, distDir: phase === 'phase-development-server' ? '.next' : '.next-production' })
