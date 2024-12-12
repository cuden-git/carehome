<?php
/**
* Template Name: Careers layouts
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
      <div class="col-12 col-lg-6 mb-lg-0 mb-5 page-intro d-flex align-items-center mb-lg-0 mb-5">
        <div>
          <h2 class="page-intro__title mb-4"><?php the_title() ?></h2>
          <?php the_content() ?>
          <a href="#contact" class="btn btn-primary mt-4" title="<?= __('Contact Us',THEME_NAMESPACE) ?>"><?= __('Contact Us',THEME_NAMESPACE) ?></a>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <?php get_template_part('/partials/careers-search-short') ?>
      </div>
    </div>
  </div>
<?php get_template_part('/partials/fc-careers-loop') ?>
</main>

<?php
get_footer();
