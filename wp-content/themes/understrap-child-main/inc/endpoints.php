<?php

/**
 * Add meta fields to post types endpoints
 */
register_rest_field( ['post', 'care-home'], 'meta', array(
  'get_callback' => function ( $data ) {
    return get_post_meta( $data['id'], '', '' );
}, ));

/**
 * Endpoint to provide Google Places suggestion data based on part of an address.
 * Can't use the API directly in a js fetch() call without invoking a CORS policy error
 */
function qc_get_location_sugestion($data) {
 // $response = file_get_contents("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=$data[part]&components=country:uk&key=" . GOOGLE_API_KEY);
  $response = wp_remote_get(GOOGLE_MAPS_API_URL . "place/autocomplete/json?input=$data[part]&components=country:uk&key=" . GOOGLE_API_KEY);

	$json = json_decode($response['body'], true);

  if($json['status'] !== 'OK') {
    return null;
  }
    
  return $json['predictions'][0]['description'];
}
add_action( 'rest_api_init', function () {
  register_rest_route( THEME_NAMESPACE . '/v1', 
    '/location-suggestion/(?P<part>[^\/]+)',
    array(
      'methods' => ['GET', 'POST'],
      'callback' => 'qc_get_location_sugestion',
      'permission_callback' => '__return_true'
  ) );
} );

/**
 * Order Care home posts based on inputted location
 */
function qc_get_location_posts(WP_REST_Request $request) {

  $post_ids = $request->get_param('post_ids');
  $response_posts = [];

  $ch_posts = get_posts([
    'post_type' => 'care-home',
    'post_status' => 'publish',
    'post__in' => $post_ids,
    'orderby' => 'post__in',
    'numberposts' => count($post_ids)
  ]);

  foreach($ch_posts as $post) {
    array_push($response_posts,
      [
        'title' => $post->post_title,
        'link' => get_permalink($post->ID),
        'src' => get_the_post_thumbnail_url($post->ID)
      ]
    );
  }

  return $response_posts;
}
 add_action( 'rest_api_init', function () {
  register_rest_route( THEME_NAMESPACE . '/v1', 
   // '/location-posts/(?P<location>[^\/]+)',
    '/location-posts',
    array(
      'methods' => ['GET', 'POST'],
      'callback' => 'qc_get_location_posts',
      'permission_callback' => '__return_true'
  ) );
} );

/**
 * Endpoint to post email address to for job details on careerssingle page
 */
add_action( 'rest_api_init', function () {
  register_rest_route( THEME_NAMESPACE . '/v1', 
    '/email-job-spec',
    array(
      'methods' => ['GET', 'POST'],
      'callback' => 'qc_email_job_url',
      'permission_callback' => '__return_true'
  ) );
} );
function qc_email_job_url(WP_REST_Request $request) {

  $email = $request->get_param('email');
  $post_id = $request->get_param('post_id');

  $post_url = get_permalink($post_id);
  $email_body = get_field('job_email_msg', 'option');
  $email_body = str_replace("{URL-LINK}", $post_url, $email_body);
  require_once __DIR__ . '/html-email-template.php';
  $email_headers = ['Content-Type: text/html; charset=UTF-8'];
  $sent = wp_mail($email, __('Quantum Care Job', THEME_NAMESPACE), $html, $email_headers);

  if ( ! $sent ) {
    return new WP_REST_Response(
      array(
        'success' => false,
        'message' => 'Failed. Please try again later',
        'sent_msg' => $sent,
        'email_address' => $email
      ),
      500 
    );
  }

  return new WP_REST_Response(
    array(
        'success' => true,
        'message' => 'Email successfully sent.',
        'email_body' => $email_body,
        'email_address' => $email
    ),
    200
  );
}
