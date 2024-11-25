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
	wp_dequeue_style('contact-form-7');

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
	// foreach ($blocks as $block) {
	// 	if ($block['blockName'] === THEME_NAMESPACE . '/care-home') {
	// 		$post_code_value = $block['attrs']['data']['ch_address_post_code'];

	// 		break;
	// 	}
	// }
	$post_code_value = get_field('ch_address')['post_code'];
	//Compare stored and current values
	$stored_long_lat = get_post_meta($post_id, $meta_key_long_lat, true);
	//Use post code to get longitude and latidue values with Google Maps API and store them in the post_meta table
	$gm_url = GOOGLE_MAPS_API_URL . "geocode/json?address=" . urlencode($post_code_value) . "&key=" . GOOGLE_API_KEY;
	$response = file_get_contents($gm_url);
	$json = json_decode($response, true);

	if($json['status'] === 'OK') {
		$lat = $json['results'][0]['geometry']['location']['lat'];
		$long = $json['results'][0]['geometry']['location']['lng'];

		update_post_meta($post_id, $meta_key_long_lat, $long . '/' . $lat);	
	}
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
function qc_ch_queries( $query ) {
  if (!is_admin() && $query->is_main_query() && isset($query->query['post_type']) && $query->query['post_type'] === 'care-home'){ 
		$query->set('posts_per_page', 4);
	}
}
add_action( 'pre_get_posts', 'qc_ch_queries', 12);

/**
 * Disable block editor for post types
 */
function qc_disable_block_editor($use_block_editor, $post_type)
{
		$post_types = ['career'];
		if (in_array($post_type, $post_types)) {
				$use_block_editor = false;
		}
		return $use_block_editor;
}
//add_filter('use_block_editor_for_post_type', 'qc_disable_block_editor', 999, 2);

/**
 * Transfer options from careers settings job role field to careers edit page select menu
 */
function qc_populate_acf_select_field( $field ) {
	$options = get_field('careers_job_roles', 'option');
	
	if( $options ) {
			$field['choices'] = [];

			foreach( $options as $option ) {
					$field['choices'][ $option['job_role'] ] = $option['job_role'];
			}
	}
	
	return $field;
}
add_filter('acf/load_field/name=careers_post_job_role', 'qc_populate_acf_select_field');
add_filter('acf/load_field/name=career_job_roles', 'qc_populate_acf_select_field');
/**
 * Load Care Homes into select menu for news item
 */
function qc_load_ch_selection($field) {
	$posts = get_posts(
		[
			'post_type' => 'care-home',
			'numberposts' => -1
		]
	);

	if($posts) {
		$field['choices'] = [];
		foreach($posts as $post) {
			$care_home_name = get_field('ch_name', $post->ID);
			$name = ($care_home_name)? $care_home_name : $post->post_title;
			$field['choices'][$post->ID] = $name;
		}
	}

	return $field;
}
add_filter('acf/load_field/name=news_care_homes', 'qc_load_ch_selection');

/**
 *  Set lng/lat of care home linked to and set meta field. 
 *  Priority less than 10 means this fires before save.
 */
function qc_set_career_lng_lat( $post_id ) {
	$care_home = get_field('career_care_home', $post_id);

	if($care_home) {
		//get care home post lng lat
		$ch_lng_lat = get_post_meta($care_home->ID, 'ch_long_lat', true);
		//set the care home lng/lat for career post meta
		update_post_meta($post_id, 'ch_long_lat', $ch_lng_lat );
	}
}
add_action('acf/save_post', 'qc_set_career_lng_lat', 11);


/**
 * Filter to set archive page titles
 */
add_filter( 'get_the_archive_title', function( $title ) {

	if ( is_post_type_archive('career') ) {
		$title = get_field('careers_archive_page_title', 'option');
	}

	if ( is_post_type_archive('care-home') ) {
		$title = get_field('ch_archive_page_title', 'option');
	}

	return $title;

}, 50 );

/**
 * Set Footer nav location
 */
function qc_register_footer_menu() {
	register_nav_menu( 'secondary', __( 'Secondary Menu', THEME_NAMESPACE ) );
	register_nav_menu( 'footer', __( 'Footer Menu', THEME_NAMESPACE ) );
	register_nav_menu( 'footer-secondary', __( 'Footer Secondary Menu', THEME_NAMESPACE ) );
}
add_action( 'after_setup_theme', 'qc_register_footer_menu' );

/**
 * Add dynamic CF7 email recipient.
 * See: https://wordpress.stackexchange.com/questions/336886/how-to-set-contact-form-7-fields-default-value-using-shortcode-attribute
 */
// add_filter( 'shortcode_atts_wpcf7', 'qc_cf7_email_recipient_attr', 10, 3 );
// function qc_cf7_email_recipient_attr ( $out, $pairs, $atts ) {
//     $email_attr = 'destination-email';

//     if ( isset( $atts[$email_attr] ) ) {
//         $out[$email_attr] = $atts[$email_attr];
//     }

//     return $out;
// }
function qc_set_cf7_email_recipient( $contact_form, &$abort, $submission ) {
	
	$job_form_id = get_field('job_form_id', 'option');
	$site_contact_form_id = get_field('contact_form_id', 'option');
	$contact_form_recipient = get_field('contact_form_email', 'option');
	$form_data = $submission->get_posted_data();
  $job_recipient_email = get_field('career_recipient_email', $form_data['post_id']);
  $properties = $contact_form->get_properties();

	//Career apply form
	if($job_recipient_email && $contact_form->id() === intval($job_form_id)) {
		$properties['mail']['recipient'] = $job_recipient_email;
		$properties['mail']['body'] .= __("Job application for " . get_permalink($form_data['post_id']), THEME_NAMESPACE);
		$contact_form->set_properties($properties);
	}

	//Generic contact form
	if($contact_form_recipient && $contact_form->id() === intval($site_contact_form_id)) {
		// If on care home single page change recipient care home email address
		if($form_data['type_post'] === 'care-home') {
			$contact_form_recipient = get_field('ch_form_recipient', $form_data['post_id']);
		}
		$properties['mail']['recipient'] = $contact_form_recipient;
		$contact_form->set_properties($properties);
	}
	//
  return $contact_form;
}
add_filter( 'wpcf7_before_send_mail', 'qc_set_cf7_email_recipient', 10, 3 );

/**
 * Add the ID of the post that the form is embedded into.
 * Adds it to the hidden field, name = post_id, that is set in the backend UI.
 */
function qc_add_post_id($tag, $unused) {
		$post_type = get_post_type(get_the_ID());

    if ($tag['name'] === 'post_id') {
        $tag['values'] = [get_the_ID()];
    }

		if($tag['name'] === 'type_post') {
			$tag['values'] = [$post_type];
		}

    return $tag;
}
add_filter('wpcf7_form_tag', 'qc_add_post_id', 10, 2);

/**
 * Remove p tags from Contact Form 7
 */
add_filter('wpcf7_autop_or_not', '__return_false');

/**
 *  Set excerpt length
 */
add_filter('excerpt_length', function($length) {
	return 10;
}, 999);

/**
 * MailHog setup
 */
add_action( 'phpmailer_init', 'qc_mailhog_setup' );
function qc_mailhog_setup( $phpmailer ) {
    $phpmailer->Host = 'mailhog';
    $phpmailer->Port = 1025;
    $phpmailer->IsSMTP();
}