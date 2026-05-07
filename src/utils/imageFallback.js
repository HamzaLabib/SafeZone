export function useLogoFallback(event) {
  const image = event.currentTarget;

  if (image.src.endsWith('/logo.svg')) {
    return;
  }

  image.src = '/logo.svg';
  image.classList.remove('object-cover');
  image.classList.add('object-contain', 'bg-slate-950', 'p-6');
}
