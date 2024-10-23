<?php
/**
 * Enqueue our stylesheet and javascript file
 */
function theme_enqueue_styles() {
	wp_enqueue_style( 'main-styles', get_stylesheet_directory_uri() . '/build/css/main.css', array(), 1 );

// // Enqueue WP React
// 	wp_enqueue_script(
// 		'frontend',
// 		get_stylesheet_directory_uri() . $frontend_scripts,
// 		['wp-element', 'wp-api-fetch'],
// 		null,
// 		true
// 	);
// 	wp_localize_script('frontend', 'themeData', array(
// 		'nonce' => wp_create_nonce('wp_rest'), // Create a nonce for REST API requests
// 		'restURL' => esc_url_raw(rest_url())  // Pass the REST API root URL
// 	));
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
