<?php
defined( 'ABSPATH' ) || exit;
print_r($_GET);

//redirect to selected care home option
if(isset($_GET['care_homes']) && $_GET['care_homes'] !== "") {
  wp_redirect($_GET['care_homes']);
}

$query_args = [
  'post_type' => 'career',
  'posts_per_page' => 4,
];
// Handle forms data
$primary_form_data = [];
$secondary_form_data = [];

if(isset($_GET['term_ids'])) {
  $query_args['tax_query'] = [
    [
      'taxonomy' => 'careers-category',
      'field' => 'term_id',
      'terms' => $_GET['term_ids'],
    ],
  ];   

  $secondary_form_data['term_ids'] = $_GET['term_ids'];
}

if(isset($_GET['careers_keyword']) && $_GET['careers_keyword'] !== "") {
  $query_args['s'] = $_GET['careers_keyword'];
  $primary_form_data['careers_keyword'] = $_GET['careers_keyword'];
}

if(isset($_GET['careers_role']) && $_GET['careers_role'] !== "") {
  $query_args['meta_key'] = 'careers_job_role';
  $query_args['meta_value'] = $_GET['careers_role'];
  $primary_form_data['careers_role'] = $_GET['careers_role'];
}

//unset($_GET['careers_distance']);
if(isset($_GET['careers_location']) && $_GET['careers_location'] !== "") {
  $primary_form_data['careers_location'] = $_GET['careers_location'];
  qc_set_distance_meta($_GET['careers_location'], get_post_type());
  $query_args['meta_key'] = 'ch_distance';
  $query_args['orderby'] = 'meta_value_num';
  $query_args['order'] = 'ASC';  

  // if($_GET['careers_distance'] > 0) {
  //   echo $_GET['careers_distance']; die();
  // }
}else {
  unset($_GET['careers_distance']);
}

if(isset($_GET['careers_distance']) && $_GET['careers_distance'] !== "") {
  $secondary_form_data['careers_distance'] = $_GET['careers_distance'];
  $query_args['meta_query'] = [
    [
      'key'     => 'ch_distance',
      'value'   => $_GET['careers_distance'],
      'type'    => 'numeric',
      'compare' => '<',
    ],
  ];
}

// $query_args = [
//   'post_type' => 'career',
//   'posts_per_page' => 4,
//   'meta_query' => [
//     [
//       'key'     => 'ch_distance',
//       'value'   => 13,
//       'type'    => 'numeric',
//       'compare' => '<=',
//     ],
//   ],
//   'meta_key' => 'ch_distance',
//   'orderby' => 'meta_value_num',
//   'order' => 'ASC'
// ];
print_r($query_args);
$query = new WP_Query($query_args);

get_header();
?>

<main id="career-results" class="careers-list">
  <div class="container">
  <?php require_once __DIR__ . '/partials/careers-search.php' ?>
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
        }
      ?>
      </div>
    </div>
  </div>
</main>

<?
get_footer();
