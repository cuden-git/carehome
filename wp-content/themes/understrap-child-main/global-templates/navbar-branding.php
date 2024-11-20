<?php
/**
 * Navbar branding
 *
 * @package Understrap
 * @since 1.2.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$is_premium = qc_is_premium();
if($is_premium) {
  $logo_src = 'logo-select.svg';
}elseif(is_front_page()) {
  $logo_src = 'logo-light.svg';
}else {
  $logo_src = 'logo.svg';
}
?>

<h1 class="navbar-brand mb-0">
  <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site__logo" itemprop="url">
  <img src="<?= esc_url(  get_stylesheet_directory_uri() . '/images/' . $logo_src ) ?>" alt="<?= __('Quantum Care', THEME_NAMESPACE) ?>">
  </a>
</h1>
