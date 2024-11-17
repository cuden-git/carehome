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
      <div class="col-12 col-md-6 page-intro">
        <h2 class="page-intro__title"><?php the_title() ?></h2>
        <?php the_content() ?>
        <a href="#" class="btn btn-primary" title="<?= __('Contact Us',THEME_NAMESPACE) ?>"><?= __('Contact Us',THEME_NAMESPACE) ?></a>
      </div>
      <div class="col-12 col-md-6">
        <?php get_template_part('/partials/careers-search-short') ?>
      </div>
    </div>
  </div>
<?php get_template_part('/partials/fc-careers-loop') ?>
</main>

<?php
get_footer();
