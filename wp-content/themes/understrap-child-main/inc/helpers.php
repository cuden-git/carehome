<?php

/**
 *  Get distance to each care home.
 * $fieldVal is the start location
 */
function qc_get_care_home_distance($post, $location_val) {
	$paged =  get_query_var( 'paged' );

	if(!isset($location_val)) return;
	if($paged > 0) return;

	//TODO: guard against multiple calls with pagination use. eg, if(page_param > 0) Still fires on 0 though Maybe set cookies?
	$gm_url = GOOGLE_MAPS_API_URL . "geocode/json?address=" . urlencode($location_val) . "&key=" . GOOGLE_API_KEY;
			
	$response = wp_remote_get($gm_url);

	$results = json_decode($response['body']);

	if($results->status === 'OK') {
		$start_lng = $results->results[0]->geometry->location->lng;
		$start_lat = $results->results[0]->geometry->location->lat;
		$post_meta = get_post_meta($post->ID, 'ch_long_lat', true);
		$post_meta = explode('/', $post_meta);
		$post_lng = $post_meta[0];
		$post_lat = $post_meta[1];

		return qc_coords_distance($post_lat, $post_lng, $start_lat, $start_lng );
	}

	return null;
}

/**
 * Set distance meta field for all care home posts
 * $location_val is the location data to search for
 */
function qc_set_distance_meta($location_val, $post_type) {
  $posts = get_posts(  [
    'posts_per_page' => -1,
    'post_type' => $post_type,
    'post_status' => 'publish'
  ] );

  foreach($posts as $post) {
   $post_distance = qc_get_care_home_distance($post, $location_val);

	 if($post_distance) {
		update_post_meta($post->ID, 'ch_distance', $post_distance);
	 }
  }
}

/**
 * Function to measure distance between 2 sets of long/lat coords
 *  as the crow flies based on the Haversine formula.
 * Set $earth_radius to 3959 for miles and 6371 for kilometers
 */
function qc_coords_distance($lat_from, $long_from, $lat_to, $long_to, $earth_radius = 3959)
{
	// Convert from degrees to radians
	$lat_from = deg2rad($lat_from);
	$long_from = deg2rad($long_from);
	$lat_to = deg2rad($lat_to);
	$long_to = deg2rad($long_to);

	// Haversine formula
	$lat_delta = $lat_to - $lat_from;
	$long_delta = $long_to - $long_from;

	$a = sin($lat_delta / 2) * sin($lat_delta / 2) +
		cos($lat_from) * cos($lat_to) *
		sin($long_delta / 2) * sin($long_delta / 2);
	$c = 2 * atan2(sqrt($a), sqrt(1 - $a));

	// Calculate the distance
	return round($earth_radius * $c);
}

/**
 * Extract repeater tabbed content fields
 */
function qc_tabbed_content_arrays($rows) {
	$arr = [];
	$arr['tabs'] = [];
	$arr['content'] = [];

	if($rows) {
		foreach( $rows as $row ) {
			array_push($arr['tabs'], $row['job_title']);
			array_push($arr['content'], [
				'img' => wp_get_attachment_image($row['image']['ID'], 'large'),
				'name' => $row['name'],
				'role' => $row['role'],
				'description' => $row['description']
			]);
		}
	}

	return $arr;
}

/**
 * Get the Careers taxonomies
 */
function qc_get_careers_cats() {
	$cats_list = [];
	$tax_name = 'careers-category';
	
	$top_level_cats = get_terms([
    'taxonomy'   => $tax_name,
    'parent'     => 0, // Only fetch top-level terms
    'hide_empty' => false, // Set to true if you only want terms assigned to posts
	]);

	if (!empty($top_level_cats) && !is_wp_error($top_level_cats)) {
		foreach($top_level_cats as $top_cat) {

			$cats_list[$top_cat->name] = [];

			$child_cats = get_terms([
				'taxonomy'   => $tax_name,
				'parent'     => $top_cat->term_id,
				'hide_empty' => false,
			]);

			foreach($child_cats as $child_cat) {
				array_push($cats_list[$top_cat->name], ['term_id' => $child_cat->term_id, 'name' => $child_cat->name]);
			}
		}
	}

	return $cats_list;
}
