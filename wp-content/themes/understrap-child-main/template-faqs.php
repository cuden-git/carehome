<?php
/**
* Template Name: FAQs
*/
?>
<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$carousel = get_field('hero_carousel');

get_header();
?>

<main class="site__main" id="main">
  <div class="container">
    <div class="row">
      <div class="col-md-10 col-lg-9 mx-auto">
        <?php the_content() ?>
      </div>
    </div>
  </div>
  <div class="container mb-5 pb-md-5 pb-0">
    <div class="row">
      <div class="col-md-10 col-lg-9 mx-auto">
        <?php get_template_part('/partials/accordion') ?>
      </div>
    </div>
  </div>
</main>
<?php
get_footer();
