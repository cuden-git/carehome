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
      'methods' => 'GET',
      'callback' => 'qc_get_location_sugestion',
      'permission_callback' => '__return_true'
  ) );
} );

/**
 * Order Care home posts based on inputted location
 */
function qc_get_location_posts($data) {
  $all_ch_posts = get_posts([
    'post_type' => 'care-home',
    'post_status' => 'publish',
    'posts_per_page' => -1,
   // 'meta_key'   => 'ch_long_lat'
  ]);
  //print_r($all_ch_posts);
  $sorted_arr = [];

        						//gd1
                    $start_lat =  55.8585849;
                    $start_lng = -4.245604999999999;
                    //n8
              //	$start_lat =  51.59665769999999;
               // $start_lng = -0.0990215; 
  foreach($all_ch_posts as $ch_post) {
    $lng_lat_meta = get_post_meta($ch_post->ID, 'ch_long_lat', true);
  
   // if($lng_lat_meta) {
      $lng_lat_meta = explode('/', $lng_lat_meta);
      $sorted_arr[$ch_post->ID]['title'] = $ch_post->post_title;
      $sorted_arr[$ch_post->ID]['link'] = get_permalink($ch_post->ID);
      $sorted_arr[$ch_post->ID]['lng'] = (float)$lng_lat_meta[0];
      $sorted_arr[$ch_post->ID]['lat'] = (float)$lng_lat_meta[1];
      $sorted_arr[$ch_post->ID]['distance'] = qc_coords_distance($lng_lat_meta[1], $lng_lat_meta[0], $start_lat, $start_lng );
  //  }
  }
 //print_r($sorted_arr);
  usort($sorted_arr, function($a, $b) use ($start_lat, $start_lng) {
    return $a['distance'] - $b['distance'];
  });	

  return $sorted_arr;

// get long/lat for suggestion
 // $gm_url = GOOGLE_MAPS_API_URL . "geocode/json?address=" . $data['location'] . "&key=" . GOOGLE_API_KEY;
 //// $response = wp_remote_get($gm_url);
 // $json = json_decode($response['body'], true);

  if($json['status'] !== 'OK') {
    return null;
  }

  $location_lat_lng = [
    'lat' => $json['results'][0]['geometry']['location']['lat'],
    'long' => $json['results'][0]['geometry']['location']['lng']
  ];

  return $json['results'][0]['geometry']['location'];
}
 add_action( 'rest_api_init', function () {
  register_rest_route( THEME_NAMESPACE . '/v1', 
   // '/location-posts/(?P<location>[^\/]+)',
    '/location-posts',
    array(
      'methods' => 'GET',
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

  $sent = wp_mail($email, __('Quantum Care Job', THEME_NAMESPACE), $email_body);

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
