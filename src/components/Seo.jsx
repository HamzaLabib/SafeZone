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

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function removeElement(selector) {
  document.head.querySelector(selector)?.remove();
}

function getCanonicalUrl() {
  const path = `${window.location.pathname}`.replace(/\/$/, '') || '/';
  return new URL(path, businessInfo.baseUrl).toString();
}

export function Seo({ title, description, jsonLd, noindex = false, image = '/hero-security-training.jpg' }) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${businessInfo.name}` : businessInfo.name;
    const imageUrl = new URL(image, businessInfo.baseUrl).toString();

    document.title = pageTitle;

    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description', content: description });
      upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
      upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    }

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: getCanonicalUrl() });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: businessInfo.name });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

    if (noindex) {
      upsertMeta('meta[name="robots"]', { name: 'robots', content: 'noindex, nofollow' });
    } else {
      removeElement('meta[name="robots"]');
    }
  }, [description, image, noindex, title]);

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
