export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID as string, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  action: any,
  { event_category, event_label, value }: any
) => {
  if (typeof window !== 'undefined') {
    window.gtag('event', action, {
      event_category,
      event_label,
      value,
    });
  }
};
