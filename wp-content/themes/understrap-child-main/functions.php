<?php

/**
 * Understrap Child Theme functions and definitions
 *
 * @package UnderstrapChild
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

require_once __DIR__ . '/inc/vars.php';
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
	$frontend_scripts = "/frontend-2/build/index.js";

	$css_version = $theme_version . '.' . filemtime(get_stylesheet_directory() . $theme_styles);

	wp_enqueue_style('child-understrap-styles', get_stylesheet_directory_uri() . $theme_styles, array(), $css_version);
	wp_enqueue_script('jquery');

	$js_version = $theme_version . '.' . filemtime(get_stylesheet_directory() . $theme_scripts);

	wp_enqueue_script('child-understrap-scripts', get_stylesheet_directory_uri() . $theme_scripts, array(), $js_version, true);


	// Enqueue WP React
	// wp_enqueue_script(
	// 	'frontend',
	// 	get_stylesheet_directory_uri() . $frontend_scripts,
	// 	['wp-element', 'wp-api-fetch'],
	// 	null,
	// 	true
	// );
	wp_localize_script('child-understrap-scripts', 'themeData', array(
		'nonce' => wp_create_nonce('wp_rest'), // Create a nonce for REST API requests
		'restURL' => esc_url_raw(rest_url()),  // Pass the REST API root URL
		'postID' => get_the_ID()
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
	$the_theme     = wp_get_theme();
	$theme_version = $the_theme->get('Version');
	$suffix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
	//$editor_theme_styles  = "/css/custom-editor-style{$suffix}.css";
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
function my_acf_block_save_action($post_id, $post, $update)
{

	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
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
add_action('save_post_care-home', 'my_acf_block_save_action', 20, 3);

/**
 * Function to measure distance between 2 sets of long/lat coords as the crow flies based on the Haversine formula
 */
function qs_coords_distance($lat_from, $long_from, $lat_to, $long_to, $earth_radius = 6371)
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
	return $earth_radius * $c;
}
