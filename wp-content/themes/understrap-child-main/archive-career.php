<?php
defined( 'ABSPATH' ) || exit;

//redirect to selected care home option
if(isset($_GET['care_homes']) && $_GET['care_homes'] !== "") {
  wp_redirect($_GET['care_homes']);
}

$query_args = [
  'post_type' => 'career',
  'posts_per_page' => 10,
];

$meta_query = [];

// Handle forms data
$primary_form_data = [];
$secondary_form_data = [];
$form_level = (isset($_GET['form_level']))? $_GET['form_level'] : null ;

if(isset($_GET['careers_keyword']) && $_GET['careers_keyword'] !== "") {
  $query_args['s'] = $_GET['careers_keyword'];
  $primary_form_data['careers_keyword'] = $_GET['careers_keyword'];
}

if(isset($_GET['careers_role']) && $_GET['careers_role'] !== "") {
  array_push($meta_query, 
    [
      'key' => 'careers_post_job_role',
      'value' => $_GET['careers_role']
    ]
  );
  //-------

  $primary_form_data['careers_role'] = $_GET['careers_role'];
}

if(isset($_GET['careers_location']) && $_GET['careers_location'] !== "") {
  $primary_form_data['careers_location'] = $_GET['careers_location'];
  qc_set_distance_meta($_GET['careers_location'], get_post_type());
  array_push($meta_query, [
      'key' => 'ch_distance',
      'orderby' => 'meta_value_num',
      'order' => 'ASC'
    ]
  );
  //-------

}else {
  unset($_GET['careers_distance']);
}

 // 2nd level form data
if(isset($_GET['careers_distance']) && $_GET['careers_distance'] !== "") {
  $secondary_form_data['careers_distance'] = $_GET['careers_distance'];
    array_push($meta_query, [
      'key' => 'ch_distance',
      'value' => $_GET['careers_distance'],
      'type' => 'numeric',
      'compare' => '<'
    ]
  );
}

if(isset($_GET['term_ids'])) {
  $query_args['tax_query'] = [
    [
      'taxonomy' => 'careers-category',
      'field' => 'term_id',
      'terms' => $_GET['term_ids'],
     // 'operator' => 'OR',
        'operator' => 'AND'
    ],
  ];   

  $secondary_form_data['term_ids'] = $_GET['term_ids'];
}

if(count($meta_query) > 0) {
 // $meta_query['relation'] = 'AND';
  $query_args['meta_query'] = $meta_query; 
}
//print_r($query_args);
$query = new WP_Query($query_args);

get_header();
?>

<main id="career-results site__main"" class="careers-list">
  <div class="bg-secondary">
    <div class="container">
    <?php //require_once __DIR__ . '/partials/careers-search.php' ?>
    <?php get_template_part('/partials/careers-search', null, ['show_all' => true]) ?>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-4">
        <?php require_once __DIR__ . '/partials/careers-sidebar.php' ?>
      </div>
      <div class="col-12 col-md-8">
      <?php
        if ( $query->have_posts() ) {
          while ( $query->have_posts() ) {
            $query->the_post();
            get_template_part('/partials/career-card');
          }
        }else {
          echo __('No results found based on your search criteria', THEME_NAMESPACE);
        }
        wp_reset_postdata()
      ?>
      </div>
    </div>
  </div>
</main>

<?
get_footer();
