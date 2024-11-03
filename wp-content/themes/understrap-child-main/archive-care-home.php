<?php
defined( 'ABSPATH' ) || exit;
echo 'denis';
get_header();
if(isset($_GET['location'])) {
//qc_location_ordered_posts($_GET['location']);
// The Query
// query_posts( [
//   'posts_per_page' => 3,
//   'post_type' => 'care-home'
// ] );

 }
//  global $wp_query;
//  $wp_query->set('posts_per_page', 3);
//  $wp_query->set('meta_key', 'ch_distance');
// $wp_query->set('orderby', 'meta_value_num');
//  $args = array_merge( $wp_query->query_vars, array( 'posts_per_archive_page' => 3 ) );
//  query_posts( $args );
//  set_query_var( 'posts_per_archive_page',1 );//set_query_var('posts_per_archive_page', $limit);
// ?>
<main id="care-home-results" class="care-home-archive">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6">
      <?php get_template_part( 'partials/care-home-search' ); ?>
      </div>
    </div>
  </div>
  <!-- -->
  <div id="care-homes-list" class="container care-homes-list">
    <div class="row">
  <?php
//   $posts = get_posts(  [
//     'posts_per_page' => -1,
//     'post_type' => 'care-home',
//     'post_status' => 'publish'
//   ] );

//   foreach($posts as $post) {
//    // $post->distance = rand(1, 100);
//  //   update_post_meta($post->ID, 'ch_distance', $post->distance);
//   }
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
$query_args = [
  'posts_per_page' => 3,
  'post_type' => 'care-home',
  'post_status' => 'publish',
  'paged' => $paged
];

if(isset($_GET['location'])) {
  qc_set_distance_meta();
  $query_args['meta_key'] = 'ch_distance';
  $query_args['orderby'] = 'meta_value_num';
  $query_args['order'] = 'ASC';   
}
print_r($query_args);
// Custom query. 
$query = new WP_Query(
  [
    'posts_per_page' => 3,
    'post_type' => 'care-home',
    'post_status' => 'publish',
    'meta_key'=> 'ch_distance',
    'orderby' => 'meta_value_num',
    'order' => 'ASC',
    'paged' => $paged
  ] 
);
// Check that we have query results. 
if ( $query->have_posts() ) {
    // Start looping over the query results. 
    while ( $query->have_posts() ) {
      $query->the_post();
      $block_fields = qc_get_acf_block_attrs(get_the_content(), THEME_NAMESPACE . '/care-home');
      get_template_part( 'partials/care-home-card');
  }
    $pagination_args = array(
      'total'        => $query->max_num_pages,
      'current'      => $paged,
      'show_all'     => false,
      'end_size'     => 1,
      'mid_size'     => 2,
      'prev_text'    => __('« Prev'),
      'next_text'    => __('Next »'),
  );
  
    //echo paginate_links($pagination_args);
    echo the_posts_pagination( array(
      'mid_size'  => 2,
      'prev_text' => __( 'Prev', 'textdomain' ),
      'next_text' => __( 'Next', 'textdomain' ),
    ) );
}

wp_reset_postdata();
wp_reset_query();
?>
    </div>
      </div>
    </div>
    <div id="care-homes-maps" class="care-homes-map container">map view</div>
</main>
<?

// require_once __DIR__ . '/inc/gm-js-load.php';

get_footer();
