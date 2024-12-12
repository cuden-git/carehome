<?php
/**
* Template Name: Build your own page
*/
?>
<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$carousel = get_field('hero_carousel');

get_header();
?>
<?php get_template_part('/partials/fc-loop') ?>
<?php
get_footer();
