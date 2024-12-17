<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$carousel = get_field('hero_carousel');

get_header();

get_template_part('/partials/hero-carousel', null, $carousel);
?>
<main class="site__main" id="main">
  <div class="container">
    <div class="row">
      <div class="col-12 col-xl-7 col-lg-6 page-intro d-flex align-items-center">
        <div>
          <h2 class="page-intro__title mb-4"><?php the_title() ?></h2>
          <?php 
            the_content();
            get_template_part('/partials/page-intro-cta');
          ?>
        </div>
      </div>
      <div class="col-12 col-xl-5 col-lg-6 ">
        <?php get_template_part('/partials/care-home-search') ?>
      </div>
    </div>
  </div>
<?php get_template_part('/partials/fc-loop') ?>
</main>

<?php
get_footer();
