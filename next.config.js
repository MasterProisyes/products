/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    async redirects() {
        return [
            {
                source: "/",
                destination: "/products",
                permanent: true,
            }
        ]
    }
}

module.exports = nextConfig

// (p4ncr3a5 br0th5er)//&@
