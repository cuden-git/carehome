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
?>
<h1>INDEX>PHP<i class="icon-dumbell"></i></h1>
<div class="container">

  <?php
  $posts = get_posts(  [
    'posts_per_page' => -1,
    'post_type' => 'care-home',
    'post_status' => 'publish'
  ] );

  foreach($posts as $post) {
    $post->distance = rand(1, 100);
    update_post_meta($post->ID, 'ch_distance', $post->distance);
  }
// Custom query. 
$query = new WP_Query(
  [
    'posts_per_page' => 3,
    'post_type' => 'care-home',
    'post_status' => 'publish',
    'meta_key'=> 'ch_distance',
    'orderby' => 'meta_value_num',
    'order' => 'ASC',
  ] 
);
// Check that we have query results. 
if ( $query->have_posts() ) {
    // Start looping over the query results. 
    while ( $query->have_posts() ) {
      global $post;
        $query->the_post();
        //print_r($query->the_post());
        the_title();
        echo ' / ' . get_post_meta(get_the_ID(), 'ch_distance', true) . '<br>';
       // get_template_part( 'partials/care-home-card');
    }
    echo the_posts_pagination( array(
      'mid_size'  => 2,
      'prev_text' => __( 'Back', 'textdomain' ),
      'next_text' => __( 'Onward', 'textdomain' ),
    ) );
}
wp_reset_postdata();
?>

<?php
get_footer();
