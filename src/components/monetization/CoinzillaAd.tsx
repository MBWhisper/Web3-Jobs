import { useEffect, useRef } from 'react';

interface CoinzillaAdProps {
  zoneId: string;
  width?: number;
  height?: number;
}

export function CoinzillaAd({ zoneId, width = 300, height = 250 }: CoinzillaAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Create the Coinzilla ad script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://z.coinzilla.com/static/ad.js`;
    script.innerHTML = `
      (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "${zoneId}",
        enable_page_level_ads: true
      });
    `;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      if (containerRef.current && script.parentElement === containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, [zoneId]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        margin: '0 auto',
      }}
      className="bg-[#1a1a1a] rounded-lg border border-[#00ff88]/20 flex items-center justify-center"
    >
      <p className="text-gray-500 text-xs text-center px-4">
        Ad space: {zoneId}
      </p>
    </div>
  );
}
