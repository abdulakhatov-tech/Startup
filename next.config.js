/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    target: 'es5',
    lib: ['dom', 'dom.iterable', 'esnext'],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noEmit: true,
    esModuleInterop: true,
    module: 'esnext',
    moduleResolution: 'node',
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: 'preserve',
    incremental: true,
    baseUrl: '.',
  },
  include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
  exclude: ['node_modules'],
  reactStrictMode: false,
  images: {
    domains: ['media.graphassets.com', 'localhost'],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
