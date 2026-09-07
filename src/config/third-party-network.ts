const blockedHostPatterns = [
  /(^|\.)doubleclick\.net$/i,
  /(^|\.)googlesyndication\.com$/i,
  /(^|\.)googletagservices\.com$/i,
];

export function shouldBlockThirdPartyRequest(
  requestUrl: string,
): boolean {
  try {
    const url = new URL(requestUrl);

    return blockedHostPatterns.some((pattern) =>
      pattern.test(url.hostname),
    );
  } catch {
    return false;
  }
}
