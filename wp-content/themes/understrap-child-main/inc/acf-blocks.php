<?php
add_filter( 'allowed_block_types_all', function( $allowed_blocks, $editor_context ) {
  global $post;

  //if($post->post_type === 'care-home') {
    $allowed_blocks = [
      'core/list',
      'core/list-item',
      'core/paragraph',
      'core/heading',
      'core/image',
      'core/shortcode',
      'core/embed',
    ];

    return $allowed_blocks;
 // }
}, 100, 2 );

/**
 * Add a block category for "Get With Gutenberg" if it doesn't exist already.
 *
 * @param array $categories Array of block categories.
 *
 * @return array
 */

function gwg_block_categories( $categories ) {
  $category_slugs = wp_list_pluck( $categories, 'slug' );
  return in_array( 'THEME_PRE', $category_slugs, true ) ? $categories : array_merge(
      $categories,
      array(
          array(
              'slug'  => 'quantum-care',
              'title' => __( 'Quantum Care Blocks', THEME_PRE ),
              'icon'  => null,
          ),
      )
  );
}
//add_filter( 'block_categories_all', 'gwg_block_categories' );

/**
 * We use WordPress's init hook to make sure
 * our blocks are registered early in the loading
 * process.
 *
 * @link https://developer.wordpress.org/reference/hooks/init/
 */
function qc_register_acf_blocks() {
  /**
   * We register our block's with WordPress's handy
   * register_block_type();
   *
   * @link https://developer.wordpress.org/reference/functions/register_block_type/
   */
  register_block_type( __DIR__ . '/blocks/care-home' );
}
// Here we call our tt3child_register_acf_block() function on init.
//add_action( 'init', 'qc_register_acf_blocks' );
