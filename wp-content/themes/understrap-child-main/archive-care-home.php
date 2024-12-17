<?php
defined('ABSPATH') || exit;
//redirect to selected care home option
if (isset($_GET['care_homes']) && $_GET['care_homes'] !== "") {
  wp_redirect($_GET['care_homes']);
}
$archive_intro = get_field('ch_results_intro', 'option');
$archive_list_title = get_field('ch_archive_page_title', 'option');
$per_page = get_field('ch_per_page', 'option');

$meta_query = [];
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$query_args = [
  'posts_per_page' => $per_page,
  'post_type' => 'care-home',
  'post_status' => 'publish',
  'paged' => $paged,
  'orderby' => 'title',
  'order'   => 'ASC'
];

if (isset($_GET['location'])) {
  qc_set_distance_meta($_GET['location'], get_post_type());
  array_push($meta_query, [
      'key' => 'ch_distance',
    ]
  );
  $query_args['orderby'] = 'meta_value_num';
  $query_args['order'] = 'ASC';
}

if(isset($_GET['ch_distance']) && $_GET['ch_distance'] !== "") {
    array_push($meta_query, [
      'key' => 'ch_distance',
      'value' => $_GET['ch_distance'],
      'type' => 'numeric',
      'compare' => '<='
    ]
  );
}

if(count($meta_query) > 0) {
  $meta_query['relation'] = 'AND';
}
$query_args['meta_query'] = $meta_query;

// Custom query. 
$query = new WP_Query($query_args);

get_header();
?>
<main id="care-home-results" class="site__main ch__archive pb-0">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-7 col-xl-7 col-lg-6 col-md-12 page-intro d-flex align-items-center mb-lg-0 mb-4">
        <div>
          <div class="page-intro__title mb-3"><h2><?= $archive_intro['title'] ?></h2></div>
          <?= $archive_intro['text'] ?>
          <?php
            if(!empty($archive_intro['cta'])) {
          ?>
            <a href="<?= $archive_intro['cta']['url'] ?>" class="btn btn-primary mt-4" title="<?= $archive_intro['cta']['title'] ?>"><?= $archive_intro['cta']['title'] ?></a>
          <?php
            }
          ?>
        </div>
      </div>
      <div class="col-12 col-xl-5 col-lg-6">
        <?php get_template_part('/partials/care-home-search'); ?>
      </div>
    </div>
  </div>
  <!-- -->
  <section class="bg-light-blue py-5">
    <div class="container ch__archive-switcher mb-5">
      <div class="row">
        <div class="col-md-8">
          <h3 class=""><?= $archive_list_title ?></h3>
        </div>
        <div class="col-md-4 map-button-controls d-flex justify-content-end">
          <button id="archive-switcher" class="btn btn-primary" type="button" data-swap-label="<?= __('List View', THEME_NAMESPACE) ?>"<?= ($query->found_posts === 0)? ' disabled' : null ?>><?= __('Map View', THEME_NAMESPACE) ?></button>
        </div>
      </div>
  </div>
  <!-- -->
  <div id="care-homes-list" class="container ch__list active" data-view-switch>
    <div class="row">
      <?php
      if ($query->have_posts()) {
        while ($query->have_posts()) {
          $query->the_post();
          get_template_part('partials/care-home-card');
        }
      }else {
        echo qc_archive_no_results_msg();
      }

      
    //  wp_reset_query();
      ?>
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
  <!-- Maps -->
  <div id="care-homes-maps" class="ch__map container d-none" data-view-switch>map view</div>
  </section>
</main>
<?php

get_footer();
