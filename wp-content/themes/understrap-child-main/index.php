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

if(isset($_GET['news_care_home'])) {
  $query_args['meta_key'] = 'news_care_homes';
  $query_args['meta_value'] = $_GET['news_care_home'];
}

if(isset($_GET['category_name']) && $_GET['category_name'] != '') {
  $query_args['category_name'] = $_GET['category_name'];
}

$query = new WP_Query($query_args);

get_header();
?>
<main class="site__main">
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
