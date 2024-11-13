<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$carousel = get_field('hero_carousel');

get_header();

get_template_part('/partials/hero-carousel', null, $carousel);
?>
<main class="site-main" id="main">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 page-intro">
        <h2 class="+page-intro__title"><?php the_title() ?></h2>
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
