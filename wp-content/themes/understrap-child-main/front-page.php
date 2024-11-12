<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$carousel = get_field('hero_carousel');

get_header();

get_template_part('/partials/hero-carousel', null, $carousel);
?>
<div style="height: 400px; border: 10px solid blue; width: 100%; background: yellow; position: relative">
<!-- Slider main container -->
<div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    ...
  </div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  <div class="swiper-scrollbar"></div>
</div>
</div>
<main class="site-main" id="main">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6">
        <h2><?php the_title() ?></h2>
        <?php the_content() ?>
      </div>
      <div class="col-12 col-md-6">
        <?php get_template_part('/partials/care-home-search') ?>
      </div>
    </div>
  </div>
<?php get_template_part('/partials/fc-loop') ?>
</main>

<?php
get_footer();
