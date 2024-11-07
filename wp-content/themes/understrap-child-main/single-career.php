<?php
/**
 * The template for single career posts
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
//$pay = get_field();
get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

  <main class="site-main" id="main">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <?php
          while ( have_posts() ) {
            the_post();
          ?>
          
          <?php
            the_content();
          }
          ?>
        </div>
      </div>
    </div>
  </main>
<?php
get_footer();
