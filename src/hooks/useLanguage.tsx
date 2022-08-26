export const useLanguage = () => {
  return window.drupalSettings.path.currentLanguage || 'fi';
};

export default useLanguage;
