/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://my-doc-view.vercel.app",
    generateRobotsTxt: true,
    exclude: [
        '/server-sitemap.xml',
        "/icon.svg",
        "/login"
    ],
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: 'Googlebot', allow: '/', robotsTxtOptions: { siteMap: process.env.NEXT_PUBLIC_SITE_URL + '/sitemap-index.xml' } }
        ],
    }
};