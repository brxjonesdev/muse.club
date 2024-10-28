// next.config.mjs

export default {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.billboard.com',
          port: '',
          pathname: '/**', // This allows all paths under the domain
        },
      ],
    },
  };
  