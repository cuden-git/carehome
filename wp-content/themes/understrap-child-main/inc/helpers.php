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
	
  foreach($posts as $post) {echo $post->post_title;
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
				'img' => '<img src="' . $row['image']['url'] . '" alt="' . $row['image']['alt'] . '">',//wp_get_attachment_image($row['image']['ID'], 'large'),
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

/**
 * Get page title. Both for archive and normal page types
 */
function qc_page_title() {
	if(is_archive()) {
		$title = get_the_archive_title();
	}else {
		$title = get_the_title();
	}

	return $title;
}

/**
 * Get the Job Type cat for post
 */
function qc_get_job_type($post_id) {
	$parent_term = get_term_by('slug', 'shift-type', 'careers-category');
	$post_terms = get_the_terms($post_id, 'careers-category');

	foreach($post_terms as $term) {
		if($term->parent === $parent_term->term_id) {
			return $term->name;
		}
	}
	
	return null;
}

/**
 * Get social media links
 */
function qc_social_media() {
	$sm_links = get_field('social_media', 'option');

	return $sm_links;
}

/**
 * Get news posts linked to care home
 */
function qc_related_news($post_id, $num_posts) {
	$related_news = get_posts([
		'post_type' => 'post',
		'meta_key' => 'news_care_homes',
		'meta_value' => $post_id,
		'post_status' => 'publish',
		'numberposts' => $num_posts
	]);

	return $related_news;
}

/**
 * Sets the ID CSS hook for the anchor links
 */
function qc_set_achor_index() {
	static $count = 0;

	echo 'section-' . $count;
	
	++$count;
}

/**
 * Gets the section menu labels
 */
function qc_get_section_labels() {
	$page_field_objs = get_field_objects();
	$menu_items = [];

	foreach($page_field_objs as $page_obj) {
		if(is_array($page_obj['value']) && array_key_exists('section_menu_label', $page_obj['value'])) {
			array_push($menu_items, $page_obj['value']['section_menu_label']);
		}
	}
	
	return $menu_items;
}

/**
 * Create secondary navigation from child pages
 */
function qc_page_secondary_nav() {
// see https://developer.wordpress.org/reference/functions/wp_get_post_parent_id/
	global $post;

	$post_parent_id = ($post->post_parent === 0)? $post->ID : $post->post_parent;
	$child_posts = get_posts([
		'post_type'      => 'page',
		'posts_per_page' => -1,
		'post_parent'    => $post_parent_id,
		'order'          => 'ASC',
		'orderby'        => 'menu_order'
	]);

	if(empty($child_posts)) {
		return null;
	}

	return $child_posts;
}
