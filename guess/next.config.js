const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: isProduction
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*` // Use the ngrok URL in production
                    : 'http://127.0.0.1:8080/:path*', // Use the local backend during development
            },
        ];
    },
};
