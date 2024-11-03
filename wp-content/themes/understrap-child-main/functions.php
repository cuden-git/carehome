<?php

/**
 * Understrap Child Theme functions and definitions
 *
 * @package UnderstrapChild
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

require_once __DIR__ . '/inc/vars.php';
require_once __DIR__ . '/inc/helpers.php';
require_once __DIR__ . '/inc/endpoints.php';
require_once __DIR__ . '/inc/acf-blocks.php';

/**
 * Removes the parent themes stylesheet and scripts from inc/enqueue.php
 */
function understrap_remove_scripts()
{
	wp_dequeue_style('understrap-styles');
	wp_deregister_style('understrap-styles');

	wp_dequeue_script('understrap-scripts');
	wp_deregister_script('understrap-scripts');
}
add_action('wp_enqueue_scripts', 'understrap_remove_scripts', 20);



/**
 * Enqueue our stylesheet and javascript file
 */
function theme_enqueue_styles()
{

	// Get the theme data.
	$the_theme     = wp_get_theme();
	$theme_version = $the_theme->get('Version');

	$suffix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
	// Grab asset urls.
	$theme_styles  = "/css/child-theme{$suffix}.css";
	$theme_scripts = "/js/child-theme{$suffix}.js";

	$css_version = $theme_version . '.' . filemtime(get_stylesheet_directory() . $theme_styles);

	wp_enqueue_style('child-understrap-styles', get_stylesheet_directory_uri() . $theme_styles, array(), $css_version);
	wp_enqueue_script('jquery');

	$js_version = $theme_version . '.' . filemtime(get_stylesheet_directory() . $theme_scripts);

	wp_enqueue_script('child-understrap-scripts', get_stylesheet_directory_uri() . $theme_scripts, array('googlemaps-api'), $js_version, true);

	wp_enqueue_script('googlemaps-api', 
		GOOGLE_MAPS_API_URL . 'js?libraries=places,geometry&v=beta&loading=async&key=' . GOOGLE_API_KEY, 
		[], 
		$js_version, 
		array(
			'in_footer' => true,
			'strategy'  => 'async',
		)
	);

	wp_localize_script('child-understrap-scripts', 'themeData', array(
		'nonce' => wp_create_nonce('wp_rest'), // Create a nonce for REST API requests
		'restURL' => esc_url_raw(rest_url()),  // Pass the REST API root URL
		'postID' => get_the_ID(),
		'gmURL' => GOOGLE_MAPS_API_URL,
		'gmKey' => GOOGLE_API_KEY
	));
	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

/** 
 * Load styles into editor for similar formatting to front-end
 */
function my_block_editor_styles() {
	$the_theme = wp_get_theme();
	$theme_version = $the_theme->get('Version');
	$suffix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
	$editor_theme_styles  = "/css/child-theme{$suffix}.css";
	$css_version = $theme_version . '.' . filemtime(get_stylesheet_directory() . $editor_theme_styles);

  wp_register_style( 'qc-editor-theme-styles', get_stylesheet_directory_uri() . $editor_theme_styles, [], $css_version );
  wp_enqueue_style( 'qc-editor-theme-styles' );
}
add_action( 'enqueue_block_editor_assets', 'my_block_editor_styles' );

/**
 * Load the child theme's text domain
 */
function add_child_theme_textdomain()
{
	load_child_theme_textdomain('understrap-child', get_stylesheet_directory() . '/languages');
}
add_action('after_setup_theme', 'add_child_theme_textdomain');



/**
 * Overrides the theme_mod to default to Bootstrap 5
 *
 * This function uses the `theme_mod_{$name}` hook and
 * can be duplicated to override other theme settings.
 *
 * @return string
 */
function understrap_default_bootstrap_version()
{
	return 'bootstrap5';
}
add_filter('theme_mod_understrap_bootstrap_version', 'understrap_default_bootstrap_version', 20);



/**
 * Loads javascript for showing customizer warning dialog.
 */
function understrap_child_customize_controls_js()
{
	wp_enqueue_script(
		'understrap_child_customizer',
		get_stylesheet_directory_uri() . '/js/customizer-controls.js',
		array('customize-preview'),
		'20130508',
		true
	);
}
add_action('customize_controls_enqueue_scripts', 'understrap_child_customize_controls_js');

/** 
 * Add theme support for menus
 */
add_theme_support('menus');

/**
 * Add meta data when post is saved.
 */
function ch_save_post_meta($post_id, $post, $update)
{

	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
		return;
	}
	if ( wp_is_post_revision($post_id) || wp_is_post_autosave($post_id) ) {
		return;
	}

	$meta_key_long_lat = 'ch_long_lat';

	// Parse the blocks within the post content
	$blocks = parse_blocks($post->post_content);

	// Loop through each block to find ACF block and retrieve its field value
	foreach ($blocks as $block) {
		if ($block['blockName'] === THEME_NAMESPACE . '/care-home') {
			$post_code_value = $block['attrs']['data']['ch_address_post_code'];

			break;
		}
	}
	//Compare stored and current values
	$stored_long_lat = get_post_meta($post_id, $meta_key_long_lat, true);
	//Use post code to get longitude and latidue values with Google Maps API and store them in the post_meta table
	$gm_url = GOOGLE_MAPS_API_URL . "geocode/json?address=" . urlencode($post_code_value) . "&key=" . GOOGLE_API_KEY;
	$response = file_get_contents($gm_url);
	$json = json_decode($response, true);
	$lat = $json['results'][0]['geometry']['location']['lat'];
	$long = $json['results'][0]['geometry']['location']['lng'];

	update_post_meta($post_id, $meta_key_long_lat, $long . '/' . $lat);
}
add_action('save_post_care-home', 'ch_save_post_meta', 20, 3);


/**
 * Set starter default block for care-home post type
 */
add_filter( 'register_care-home_post_type_args', function ( $args, $post_type )
{
    $args['template'] = [
			['quantum-care/care-home', 
				[
					'lock' => ['remove' => false]
				]
			]
		];
		$arg['template_lock'] = "all";

    return $args;
}, 10, 2 );

/**
 * Validate ACF postcode field
 */
function qc_validate_carehome_postcode( $valid, $value, $field, $input_name ) {
	// $postcode_pattern = '/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/';
	$postcode_pattern = '/^(GIR 0AA)|((([A-Z-[QVX]][0-9][0-9]?)|(([A-Z-[QVX]][A-Z-[IJZ]][0-9][0-9]?)|(([A-Z-[QVX]][0-9][A-HJKPSTUW])|([A-Z-[QVX]][A-Z-[IJZ]][0-9][ABEHMNPRVWXY])))) [0-9][A-Z-[CIKMOV]]{2})$/';
	if (preg_match($postcode_pattern, $value)) {
		return __('Postcode is not valid', THEME_NAMESPACE);
	}

	return $valid;
}
add_filter('acf/validate_value/name=post_code', 'qc_validate_carehome_postcode', 10, 4);

/**
 * Set ACF Google Maps API key
 */
function qc_acf_init() {
    
	acf_update_setting('google_api_key', GOOGLE_API_KEY);
}
add_action('acf/init', 'qc_acf_init');

/**
 * Get ACF fields from block from within the archive loop. Returns an array of the fields for the block. 
 * If a field is a child of type ACF group then concatenate the group name 
 * with child filed name joined by an underscore
 */
function qc_get_acf_block_attrs($post_content, $block_name) {
	$blocks = parse_blocks($post_content);
 // print_r(get_field('ch_address_address'), get_the_ID());die();
	foreach ($blocks as $block) {
		if ($block['blockName'] === $block_name) {
			$fields = $block['attrs']['data'];

			return $fields;
		}
	}
	return false;
}

/**
 * Re-order care home posts based on submitted location search
 */
function qc_location_ordered_posts() {
	$gm_url = GOOGLE_MAPS_API_URL . "geocode/json?address=" . urlencode($start_location) . "&key=" . GOOGLE_API_KEY;
	
	$response = wp_remote_get($gm_url);

	$results = json_decode($response['body']);
	$start_lng = $results->results[0]->geometry->location->lng;
	$start_lat = $results->results[0]->geometry->location->lat;

	//print_r($results->results[0]->geometry->location); die();
	$all_ch_posts = get_posts([
		'post_type' => 'care-home',
		'post_status' => 'publish',
		'numberposts' => -1
	]);

	$new_arr = [];

	for($i = 0; $i < count($all_ch_posts); $i++) {
		$temp_arr = [];
	//	$temp_arr['title'] = 
	}
	foreach($all_ch_posts as $ch_post) {
		$ch_post_lng_lat = get_post_meta($ch_post->ID, 'ch_long_lat', true);

		if($ch_post_lng_lat) {

			$ch_post_lng_lat = explode('/', $ch_post_lng_lat);
			echo qc_coords_distance($ch_post_lng_lat[1], $ch_post_lng_lat[0], $start_lat, $start_lng) . '<br>';
		}
	}
}



/**
 * Change number of posts displayed on for Care Home post type archive page
 */
// add_action( 'init', function() {echo 'init';die();
// 	$posts = get_posts([
// 		'post_type' => 'care-home',
// 		'numberposts' => -1
// 	]);
// 	//print_r($posts);
// //echo 'init';
// 	foreach($posts as $post) {
// 		$post->distance = rand(1, 100);
// 		update_post_meta($post->ID, 'ch_distance', $post->distance);
// 	}
// }, 12);

function qc_ch_queries( $query ) {//echo 'pre_get_posts';die();
  if (!is_admin() && $query->is_main_query() && $query->query['post_type'] === 'care-home'){ 
		// $posts = get_posts([
		// 	'post_type' => 'care-home',
		// 	'numberposts' => -1
		// ]);

		// foreach($posts as $post) {
		// 	$post->distance = rand(1, 100);
		// 	update_post_meta($post->ID, 'ch_distance', $post->distance);
		// }
		//print_r($posts);
		$query->set('posts_per_page', 3);
		// $query->set('meta_key', 'ch_distance');
		// $query->set('orderby', 'meta_value_num');
		// $query->set('order', 'ASC');
//$query->set('posts_per_archive_page', 3);
	//	echo '<br>pre_get_posts';
	}
}
add_action( 'pre_get_posts', 'qc_ch_queries', 12);
// add_filter('the_posts', function($posts) {
// 	global $wp_query;
// 	$target_post_type = false;
		
// 		if(!is_admin()) {
	
// 			foreach($posts as $post) {
// 				if($post->post_type === 'care-home') {
// 					$target_post_type = true;
// 					$post_meta = get_post_meta($post->ID, 'ch_long_lat', true);
	
// 					if($post_meta) {
// 						//$post->lng = (metadata_exists('post', $post->ID, 'ch_long_lat'))?  :  ;
// 						$post_meta = explode('/', $post_meta);
// 						$post->lng = $post_meta[0];
// 						$post->lat = $post_meta[1];

// 						//gd1
// 						$start_lat =  55.8585849;
// 						$start_lng = -4.245604999999999;
// 						//n8
// 			//	$start_lat =  51.59665769999999;
//        // $start_lng = -0.0990215; 
// 						update_post_meta($post->ID, 'ch_distance', $post->distance = qc_coords_distance($post->lat, $post->lng, $start_lat, $start_lng ));
// 					}
					
// 					;//45;//rand(1, 100);
// 				}
// 			}
// 	$wp_query->set('meta_key', 'ch_distance');
// 	$wp_query->set('orderby', 'meta_value_num');
// 	$wp_query->set('posts_per_page', 3);
// 			if($target_post_type && isset($_GET['location'])) {//die();
// 				//echo 'true dat';
// 				 /*$gm_url = GOOGLE_MAPS_API_URL . "geocode/json?address=" . urlencode($_GET['location']) . "&key=" . GOOGLE_API_KEY;
		
// 				 $response = wp_remote_get($gm_url);
			
// 				$results = json_decode($response['body']);
// 				$start_lng = $results->results[0]->geometry->location->lng;
// 				$start_lat = $results->results[0]->geometry->location->lat;*/
//  				//n8
// 				$start_lat =  51.59665769999999;
//         $start_lng = -0.0990215; 

// 				//gd1
// 				$start_lat =  55.8585849;
// 				$start_lng = -4.245604999999999;
	
// 				usort($posts, function($a, $b) use ($start_lat, $start_lng) {
// 					//if($post_meta) {
// 						$a->distance = qc_coords_distance($a->lat, $a->lng, $start_lat, $start_lng );
// 						$b->distance = qc_coords_distance($b->lat, $b->lng, $start_lat, $start_lng );
// 			//		}
	
// 					returnparse_query $a->distance - $b->distance;
// 				});	
// 			}
// 		}
// 		// $query->set('posts_per_page', 3);
// 	//	set_query_var( 'posts_per_archive_page',3 );
// 		return $posts;
// 	}, 1, 1);
	//
/********* ********/

// add_filter( 'request', 'alter_the_query' );

// function alter_the_query( $request ) {echo 'request';die();
//     $dummy_query = new WP_Query();  // the query isn't run if we don't pass any query vars
//     $dummy_query->parse_query( $request );

// 		//echo '<br>request';
//     return $request;
// }


// add_action('wp', function($wp) {
// 	echo 'wp hook'; die();
// });

// function wpdocs_set_custom_isvars( $query ) {
// 	echo 'parse_query'; die();
// }
// add_action( 'parse_query', 'wpdocs_set_custom_isvars' );

// add_filter('posts_results', function($wp) {
// 	echo 'posts_results hook'; die();
// });

// add_filter('the_posts', function($posts) {
// 	echo 'the_postsß hook'; die();
// });

// add_action('wp_loaded', function($posts) {
// 	echo 'wp_loaded hook'; die();
// });

// add_action('muplugins_loaded', function($posts) {
// 	echo 'wp_loaded hook'; die();
// });
/**
 *  Set distance meta field for each care home based on $_GET['Location']
 * 
 */
//function qc_set_distances
