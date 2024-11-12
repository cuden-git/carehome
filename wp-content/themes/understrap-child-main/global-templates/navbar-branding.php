<?php
/**
 * Navbar branding
 *
 * @package Understrap
 * @since 1.2.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<h1 class="navbar-brand mb-0">
  <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site__logo" itemprop="url">
  <img src="<?= esc_url(  get_stylesheet_directory_uri() . '/images/' .(is_front_page()? 'logo-light.svg' : 'logo.svg') ) ?>" alt="<?= __('Quantum Care', THEME_NAMESPACE) ?>">
  </a>
</h1>
