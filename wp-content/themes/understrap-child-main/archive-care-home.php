<?php
defined('ABSPATH') || exit;
//redirect to selected care home option
if (isset($_GET['care_homes']) && $_GET['care_homes'] !== "") {
  wp_redirect($_GET['care_homes']);
}
$archive_intro = get_field('ch_results_intro', 'option');
$archive_list_title = get_field('ch_archive_page_title', 'option');

get_header();
?>
<main id="care-home-results" class="site__main ch__archive">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-7 col-xl-7 col-lg-6 col-md-12 page-intro">
      <div class="page-intro__title"><?= $archive_intro['title'] ?></div>
      <?= $archive_intro['text'] ?>
      </div>
      <div class="col-12 col-xl-5 col-lg-6">
        <?php get_template_part('partials/care-home-search'); ?>
      </div>
    </div>
  </div>
  <!-- -->
  <div class="container ch__archive-switcher d-flex">
    <h3 class=""><?= $archive_list_title ?></h3>
    <button id="archive-switcher" class="btn btn-primary" type="button" data-swap-label="<?= __('List View', THEME_NAMESPACE) ?>"><?= __('Map View', THEME_NAMESPACE) ?></button>
  </div>
  <!-- -->
  <div id="care-homes-list" class="container ch__list active" data-view-switch>
    <div class="row">
      <?php
      $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
      $query_args = [
        'posts_per_page' => 4,
        'post_type' => 'care-home',
        'post_status' => 'publish',
        'paged' => $paged
      ];

      if (isset($_GET['location'])) {
        qc_set_distance_meta($_GET['location'], get_post_type());
        $query_args['meta_key'] = 'ch_distance';
        $query_args['orderby'] = 'meta_value_num';
        $query_args['order'] = 'ASC';
      }

      // Custom query. 
      $query = new WP_Query($query_args);

      if ($query->have_posts()) {
        while ($query->have_posts()) {
          $query->the_post();
          get_template_part('partials/care-home-card');
        }
      }

      wp_reset_postdata();
      wp_reset_query();
      ?>
      <div class="col-12 d-flex ch__pagination">
        <?php
        the_posts_pagination(array(
          'mid_size'  => 2,
          'prev_text' =>  '<i class="icon-arrow-left"></i>' . __('Previous', THEME_NAMESPACE),
          'next_text' => __('Next', THEME_NAMESPACE) . '<i class="icon-arrow-right"></i>'
        ));
        ?>
      </div>
    </div>
  </div>
  <!-- Maps -->
  <div id="care-homes-maps" class="ch__map container d-none" data-view-switch>map view</div>
</main>
<?php

// require_once __DIR__ . '/inc/gm-js-load.php';

get_footer();
