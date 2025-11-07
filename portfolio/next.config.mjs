import {withSentryConfig} from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {};

// Only wrap with Sentry if auth token is available
const shouldUseSentry = process.env.SENTRY_AUTH_TOKEN;

export default shouldUseSentry 
  ? withSentryConfig(nextConfig, {
      // Suppresses source map uploading logs during build
      silent: true,
      org: process.env.SENTRY_ORG || "javascript-mastery",
      project: process.env.SENTRY_PROJECT || "javascript-nextjs",
    }, {
      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,
      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,
      // Hides source maps from generated client bundles
      hideSourceMaps: true,
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
      // Enables automatic instrumentation of Vercel Cron Monitors
      automaticVercelMonitors: true,
    })
  : nextConfig;