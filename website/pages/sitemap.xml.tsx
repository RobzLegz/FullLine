import { SITEMAP_BASE } from "../src/requests/routes";

function generateSiteMap(
  events: {
    event_url: string | null;
  }[]
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
   <loc>https://spotloc.lv/</loc>
   <lastmod>2023-05-14T20:03:16+00:00</lastmod>
   <priority>1.00</priority>
   </url>
   <url>
   <loc>https://spotloc.lv/organizatoriem</loc>
   <lastmod>2023-05-14T20:03:16+00:00</lastmod>
   <priority>0.90</priority>
   </url>
   <url>
   <loc>https://spotloc.lv/auth/login</loc>
   <lastmod>2023-05-14T20:03:16+00:00</lastmod>
   <priority>0.60</priority>
   </url>
   <url>
   <loc>https://spotloc.lv/privatuma-politika</loc>
   <lastmod>2023-05-14T20:03:16+00:00</lastmod>
   <priority>0.30</priority>
   </url>
   <url>
   <loc>https://spotloc.lv/lietosanas-noteikumi</loc>
   <lastmod>2023-05-14T20:03:16+00:00</lastmod>
   <priority>0.30</priority>
   </url>
   <url>
   <loc>https://spotloc.lv/sikfailu-politika</loc>
   <lastmod>2023-05-14T20:03:16+00:00</lastmod>
   <priority>0.30</priority>
   </url>
   <url>
   <loc>https://spotloc.lv/auth/register</loc>
   <lastmod>2023-05-14T20:03:16+00:00</lastmod>
   <priority>0.50</priority>
   </url>
     ${events
       .map(({ event_url }) => {
         return `
        <url>
          <loc>${`https://spotloc.lv/pasakums/${event_url}`}</loc>
          <priority>0.80</priority>
        </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {}

export async function getServerSideProps({ res }: { res: any }) {
  const request = await fetch(SITEMAP_BASE);
  const data = await request.json();

  const sitemap = generateSiteMap(data.sitemap);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
