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
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WFVPMP5P');</script>
<!-- End Google Tag Manager -->
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
	<!-- Meta Pixel Code -->
	<script>
	!function(f,b,e,v,n,t,s)
	{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s)}(window, document,'script',
	'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '564878999512881');
	fbq('track', 'PageView');
	</script>
	<noscript><img height="1" width="1" style="display:none"
	src="https://www.facebook.com/tr?id=564878999512881&amp;ev=PageView&amp;noscript=1"
	/></noscript>
	<!-- End Meta Pixel Code -->
</head>
<body <?php body_class(); ?>>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src='https://www.googletagmanager.com/ns.html?id=GTM-WFVPMP5P'
height='0' width='0' style='display:none;visibility:hidden'></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
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
