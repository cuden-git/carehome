<?php
/**
 * The template for single career posts
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );

$t_cs = get_field('t_cs', 'option');
?>

  <main class="site__main" id="main">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 site__sidebar">
          <?php get_template_part('/partials/single-career-sidebar') ?>
        </div>
        <div class="col-12 col-md-8 site__content">
          <?php
          while ( have_posts() ) {
            the_post();
          ?>
          <div class="">
          <?php
            the_content();
          }
          ?>
            <!-- -->
            <div class="site__content-footnote">
              <h6><?= $t_cs['title'] ?></h6>
              <?= $t_cs['text'] ?>
            </div>
            <!-- -->
          </div>
        </div>
      </div>
    </div>
  </main>

<?php
get_footer();
