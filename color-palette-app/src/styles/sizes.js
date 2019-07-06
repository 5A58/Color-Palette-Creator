export default {
  up() {

  },
  // create a media query for all screen sizes equivalent to or smaller than size
  down(size) {
    const sizes = {
      xs: '575.98px',
      sm: '767.98px',
      md: '991.98px',
      lg: '1199.98px',
      xl: '1600px',
    };
    return `@media (max-width: ${sizes[size]})`;
  },
};
