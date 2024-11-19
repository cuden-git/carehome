<?php
/**
* Template Name: News Archive
*/
?>
<?php
defined( 'ABSPATH' ) || exit;

$query_args = [
  'post_type' => 'post',
  'numberposts' => -1
];

$query = new WP_Query($query_args);
print_r($query);
get_header();
?>
<main class="">
  <div id="news-list" class="container news">
    <div class="news__filter">
      <?php  get_template_part('/partials/news-filter') ?>
    </div>
    <div class="row">
  <?php
    if ( $query->have_posts() ) {
      while ( $query->have_posts() ) {
        $query->the_post();
        get_template_part('/partials/news-card');
      }
    }
    wp_reset_postdata();
  ?>
    </div>
  </div>
</main>

<?php
get_footer();
