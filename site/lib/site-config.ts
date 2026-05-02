/** 프로덕션·OG·사이트맵용 절대 URL. Netlify 등에서 커스텀 도메인이면 환경 변수로 덮어씁니다. */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://k-design-studio.netlify.app";
  return raw.replace(/\/$/, "");
}
