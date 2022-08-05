export const t = (str: string, args: Object = {}, options: Object = {}): string => {
  if (Drupal) {
    return Drupal.t(str, args, options);
  }

  return str;
};

export default t;
