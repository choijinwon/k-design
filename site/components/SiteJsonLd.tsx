import { getSiteUrl } from "@/lib/site-config";

const DESCRIPTION =
  "바이브코딩과 오케스트레이션으로 MVP·디자인 시스템·엔터프라이즈 UI를 납품합니다. Next.js·Harness Engineering·Electron 기반.";

export function SiteJsonLd() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "K-Design Studio",
    url: `${url}/`,
    description: DESCRIPTION,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: "K-Design Studio",
      url: `${url}/`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
