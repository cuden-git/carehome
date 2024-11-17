<?php
/**
 * The header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$bootstrap_version = get_theme_mod( 'understrap_bootstrap_version', 'bootstrap4' );
$navbar_type       = get_theme_mod( 'understrap_navbar_type', 'collapse' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php do_action( 'wp_body_open' ); ?>
<div class="site" id="page">
	<!-- ******************* The Navbar Area ******************* -->
	<header class="site__header"">
		<?php get_template_part( 'global-templates/navbar', $navbar_type . '-' . $bootstrap_version ); ?>
		<?php
		if(!is_front_page()) {
		?>
		<div class="container">
			<h2 class="site__header-title text-light mb-0"><?= qc_page_title() ?></h2>
		</div>
		<?php
		}
		?>
		<?php
			if(is_singular('care-home')) {
			//	get_template_part( 'partials/header-care-home');
			}
		?>
	</header><!-- #wrapper-navbar -->
<?php get_template_part('partials/sub-nav') ?>
