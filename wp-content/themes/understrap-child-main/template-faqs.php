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
      <div class="col-12">
        <?php the_content() ?>
      </div>
    </div>
  </div>
  <div class="container">
    <?php get_template_part('/partials/accordion') ?>
  </div>
</main>
<?php
get_footer();
