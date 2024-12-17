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
$is_premium = qc_is_premium();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-XQXMS0REH8"></script>
	<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XQXMS0REH8');
</script>
</head>

<body <?php body_class(); ?>>
<?php do_action( 'wp_body_open' ); ?>
<div class="site" id="page">
	<!-- ******************* The Navbar Area ******************* -->
	<header class="site__header<?= ($is_premium)? ' site__header--premium' : null ?>">
		<?php get_template_part( 'global-templates/navbar', $navbar_type . '-' . $bootstrap_version ); ?>
		<?php
		if(!is_singular('care-home')) {
			if(!is_front_page()) {
			?>
			<div class="container">
				<h1 class="site__header-title text-light mb-0"><?= qc_page_title() ?></h1>
				<?php yoast_breadcrumb( '<ul id="breadcrumbs" class="site__breadcrumbs list-inline d-flex">','</ul>') ?>
			</div>
			<?php
			}
			?>
		<?php
		}

		if(is_singular('care-home')) {
			get_template_part( 'partials/care-home-header');
		}
		?>
	</header><!-- #wrapper-navbar -->
<?php get_template_part('partials/sub-nav') ?>
