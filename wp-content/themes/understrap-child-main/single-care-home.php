<?php
/**
 * The template for displaying all single posts
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<main class="site__main" id="main">

	<?php
	while ( have_posts() ) {
		the_post();
		the_content();
	}
	?>

</main>

<?php
get_footer();
