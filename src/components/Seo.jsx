import { useEffect } from 'react';
import { businessInfo } from '../data/business';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export function Seo({ title, description, jsonLd }) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${businessInfo.name}` : businessInfo.name;
    document.title = pageTitle;

    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description', content: description });
      upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    }

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: businessInfo.name });
  }, [description, title]);

  useEffect(() => {
    const scriptId = 'page-structured-data';
    document.getElementById(scriptId)?.remove();

    if (!jsonLd) {
      return undefined;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [jsonLd]);

  return null;
}
