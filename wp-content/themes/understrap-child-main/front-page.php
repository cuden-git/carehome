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
      <div class="col-12 col-md-7 page-intro">
        <h2 class="page-intro__title"><?php the_title() ?></h2>
        <?php the_content() ?>
        <a href="#" class="btn btn-primary" title="<?= __('Contact Us',THEME_NAMESPACE) ?>"><?= __('Contact Us',THEME_NAMESPACE) ?></a>
      </div>
      <div class="col-12 col-md-5">
        <?php get_template_part('/partials/care-home-search') ?>
      </div>
    </div>
  </div>
<?php get_template_part('/partials/fc-loop') ?>
</main>

<?php
get_footer();
