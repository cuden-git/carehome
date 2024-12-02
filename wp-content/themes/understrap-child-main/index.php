<?php
/**
* Template Name: News Archive
*/
?>
<?php
defined( 'ABSPATH' ) || exit;

$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

$query_args = [
  'post_type' => 'post',
  //'posts_per_page' => 3,
  'post_status' => 'publish',
  'paged' => $paged

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
  <div id="news-list" class="container news mb-5">
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
    }else {
      echo qc_archive_no_results_msg();
    }
  ?>
    </div>
    <div class="row">
      <div class="col-12 d-flex ch__pagination">
        <?php
         the_posts_pagination(array(
          'base'      => str_replace( 999999999, '%#%', esc_url( get_pagenum_link( 999999999 ) ) ),
          'current'   => max( 1, get_query_var( 'paged' ) ),
          'mid_size'  => 2,
          'total'     => $query->max_num_pages,
          'prev_text' =>  '<i class="icon-arrow-left"></i>' . __('Previous', THEME_NAMESPACE),
          'next_text' => __('Next', THEME_NAMESPACE) . '<i class="icon-arrow-right"></i>'
        ));
        wp_reset_postdata();
        ?>
      </div>
    </div>
  </div>
</main>

<?php
get_footer();
