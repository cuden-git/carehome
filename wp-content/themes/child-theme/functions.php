<?php
/**
 * Understrap Child Theme functions and definitions
 *
 * @package UnderstrapChild
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/inc/vars.php';

/**
 * Removes the parent themes stylesheet and scripts from inc/enqueue.php
 */
function understrap_remove_scripts() {
	wp_dequeue_style( 'understrap-styles' );
	wp_deregister_style( 'understrap-styles' );

	wp_dequeue_script( 'understrap-scripts' );
	wp_deregister_script( 'understrap-scripts' );
}
add_action( 'wp_enqueue_scripts', 'understrap_remove_scripts', 20 );



/**
 * Enqueue our stylesheet and javascript file
 */
function theme_enqueue_styles() {

	// Get the theme data.
	$the_theme     = wp_get_theme();
	$theme_version = $the_theme->get( 'Version' );

	$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
	// Grab asset urls.
	$theme_styles  = "/css/child-theme{$suffix}.css";
	$theme_scripts = "/js/child-theme{$suffix}.js";
	$frontend_scripts = "/frontend-2/build/index.js";

	$css_version = $theme_version . '.' . filemtime( get_stylesheet_directory() . $theme_styles );

	wp_enqueue_style( 'child-understrap-styles', get_stylesheet_directory_uri() . $theme_styles, array(), $css_version );
	wp_enqueue_script( 'jquery' );
	
	$js_version = $theme_version . '.' . filemtime( get_stylesheet_directory() . $theme_scripts );
	
	wp_enqueue_script( 'child-understrap-scripts', get_stylesheet_directory_uri() . $theme_scripts, array(), $js_version, true );


// Enqueue WP React
	wp_enqueue_script(
		'frontend',
		get_stylesheet_directory_uri() . $frontend_scripts,
		['wp-element', 'wp-api-fetch'],
		null,
		true
	);
	wp_localize_script('frontend', 'themeData', array(
		'nonce' => wp_create_nonce('wp_rest'), // Create a nonce for REST API requests
		'restURL' => esc_url_raw(rest_url())  // Pass the REST API root URL
	));
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );



/**
 * Load the child theme's text domain
 */
function add_child_theme_textdomain() {
	load_child_theme_textdomain( 'understrap-child', get_stylesheet_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'add_child_theme_textdomain' );



/**
 * Overrides the theme_mod to default to Bootstrap 5
 *
 * This function uses the `theme_mod_{$name}` hook and
 * can be duplicated to override other theme settings.
 *
 * @return string
 */
function understrap_default_bootstrap_version() {
	return 'bootstrap5';
}
add_filter( 'theme_mod_understrap_bootstrap_version', 'understrap_default_bootstrap_version', 20 );



/**
 * Loads javascript for showing customizer warning dialog.
 */
function understrap_child_customize_controls_js() {
	wp_enqueue_script(
		'understrap_child_customizer',
		get_stylesheet_directory_uri() . '/js/customizer-controls.js',
		array( 'customize-preview' ),
		'20130508',
		true
	);
}
add_action( 'customize_controls_enqueue_scripts', 'understrap_child_customize_controls_js' );

/** 
 * Add theme support for menus
 */
add_theme_support( 'menus' );

/**
 * Disable parent page templates 
 */
function disable_templates($page_templates) {
//	print_r($page_templates);die();
	unset( 
		$page_templates['page.php'],
		$page_templates['single.php'],
		$page_templates['search.php'],
		$page_templates['archive.php'] 
	);

	return $page_templates;
}
add_filter( 'theme_page_templates', 'disable_templates' );
add_filter( 'theme_post_templates', 'disable_templates' );
// function disable_wp_frontend() {
// 	// If it's an API request or an admin page, allow it
// 	if (is_admin() || strpos($_SERVER['REQUEST_URI'], '/wp-json/') === 0) {
// 		return;
// 	}

// 	wp_redirect('https://carehome.cuden.co.uk/frontend/', 301);

// 	exit;
// }
// add_action('template_redirect', 'disable_wp_frontend');
function remove_parent_theme_templates( $page_templates ) {
	// Unset parent theme templates
	foreach ( $page_templates as $template_name => $template_filename ) {
			if ( strpos( $template_filename, 'understrap-child' ) === false ) {
					unset( $page_templates[$template_name] );
			}
	}
	return $page_templates;
}
add_filter( 'theme_page_templates', 'remove_parent_theme_templates', 20 );

// $templates = wp_get_theme()->get_page_templates();
//     echo '<pre>';
//     print_r( $templates );
//     echo '</pre>';

/**
 * Remove the use of page templates inherited from parent theme to ensure that index.php is used every time
 */
function disable_page_templates( $template ) {
	/* List of all files to disable */
	$page_templates = ['page.php', 'single.php', 'search.php', 'archive.php'];
	$file_name = basename( $template );echo $file_name . in_array($file_name, $page_templates);//die();
	// Check if WordPress is trying to load page.php
	if ( in_array($file_name, $page_templates) ) {
	//if ( is_page() && basename( $template ) !== 'index.php' ) {
			// Redirect WordPress to use index.php
			$template = get_query_template( 'index' );  // You can also use get_query_template( 'custom-template' ) for a specific template
	}

	return $template;
}
add_filter( 'template_include', 'disable_page_templates', 99 );

function ch_get_navigation() {
	$wp_menu_items = wp_get_nav_menu_items('main nav');
	$data = [];
	print_r($wp_menu_items);die();
	foreach($wp_menu_items as $item) {
		$temp_arr = [];
		// if($item->menu_item_parent > 0) {
		// 	$temp_arr['children'] = 
		// }
		$temp_arr['item_id'] = $item->ID;
		$temp_arr['parent_id'] = $item->menu_item_parent;
		$temp_arr['title'] = $item->title;

		if($item->object_id != $item->ID ) {
			$post = get_post($item->object_id);
			$temp_arr['slug'] = $post->post_name;
			
		}else {
			$temp_arr['url'] = $item->url;
		}

		
		array_push($data, $temp_arr);
	}
	 
	 return $wp_menu_items;//$data;////wp_get_nav_menu_items('main nav');//;//;
}

add_action( 'rest_api_init', function () {
  register_rest_route( THEME_NAMESPACE . '/v1', '/nav', array(
    'methods' => 'GET',
    'callback' => 'ch_get_navigation',
		'permission_callback' => '__return_true'
  ) );
} );
