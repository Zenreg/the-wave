import { useState } from 'react';
import { useLocale } from '../i18n';

const SHARE_URL = 'https://jointhewave.fr';

export function useShare() {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = { title: 'TheWave', text: t('result.shareText'), url: SHARE_URL };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* annulé */ }
    } else {
      await navigator.clipboard.writeText(`${t('result.shareText')} ${SHARE_URL}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return { handleShare, copied };
}
