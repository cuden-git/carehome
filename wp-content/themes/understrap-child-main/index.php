<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$posts = get_posts(array(
    'posts_per_page'    => -1,
    'post_type'     => 'care-home',
    'meta_key'      => 'tober',
));
print_r($posts); die();
?>
<h1>INDEX>PHP<i class="icon-dumbell"></i></h1>

<!-- <main id="root"></main> -->
<div id="map" style="height: 400px; border: solid black 5px" class="container"></div>

<?php
get_footer();
