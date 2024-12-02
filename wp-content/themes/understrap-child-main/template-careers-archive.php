<?php
/**
* Template Name: Careers archive
*/
?>
<?php
defined( 'ABSPATH' ) || exit;

//redirect to selected care home option
if(isset($_GET['care_homes']) && $_GET['care_homes'] !== "") {
  wp_redirect($_GET['care_homes']);
}
$no_results_msg = get_field('no_results_message', 'option');
$query_args = [
  'post_type' => 'career',
  'posts_per_page' => 100,
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
    ]
  );
  $query_args['orderby'] = 'meta_value_num';
  $query_args['order'] = 'ASC';
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

if(isset($_GET['job-type']) || isset($_GET['shift-type'])) {

  $term_ids = array_filter([$_GET['shift-type'] ?? null, $_GET['job-type'] ?? null]);

  $query_args['tax_query'] = [
    [
      'taxonomy' => 'careers-category',
      'field' => 'term_id',
      'terms' => $term_ids,
     // 'operator' => 'OR',
        'operator' => 'AND'
    ],
  ];   

  $secondary_form_data['term_ids'] = $term_ids;
}

if(count($meta_query) > 0) {
  $meta_query['relation'] = 'AND';
  $query_args['meta_query'] = $meta_query; 
}

// $query_args = [
//     'post_type' => 'career',
//     'posts_per_page' => 10,
//     'meta_query' => [
//           [
//             'key' => 'ch_distance',

//           ]
//           ],
//     'orderby' => 'meta_value_num',
//     'order' => 'DSC'
//   ];

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
      <div class="col-12 col-lg-4">
        <?php require_once __DIR__ . '/partials/careers-sidebar.php' ?>
      </div>
      <div class="col-12 col-lg-8">
      <?php
        if ( $query->have_posts() ) {
          while ( $query->have_posts() ) {
            $query->the_post();
            get_template_part('/partials/career-card');
          }
        }else {
          echo qc_archive_no_results_msg();
        }
        wp_reset_postdata()
      ?>
      </div>
    </div>
  </div>
</main>

<?php
get_footer();
