<?php
/**
* Template Name: Flexi working template
*/
?>

<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$overview = get_field('ch_overview');
$cta_blocks = get_field('cta_blocks');
$testimonials = get_field('cr_testimonials');

get_header();
?>
<main class="site__main c-roles" id="main">
  <div class="container py-lg-5 my-lg-5 py-0">
    <div class="row">
      <div class="col-12 col-xl-5 col-lg-6 d-flex align-items-center">
        <div class="pe-lg-5 pe-0">
          <h2 class="page-intro__title"><?php the_title() ?></h2>
          <?php the_content() ?>
        </div>
      </div>
      <div class="col-12 col-xl-7 col-lg-6">
        <figure class="role__img">
          <?= get_the_post_thumbnail( get_the_ID() ) ?>
        </figure>
      </div>
    </div>
  </div>
  <section class="post-section care-home__overview flexi-working-section py-5 bg-secondary">
    <div class="container">
      <h2  data-aos="fade-up" class=" text-white post-section__title mb-3"><?= $overview['title'] ?></h2>
      <div class="care-home__overview-text text-white"  data-aos="fade-up">
        <?= $overview['text'] ?>
        <?php
        if($overview['button']) {
        ?>
        <div>
          <a data-aos="fade-up"  href="<?=__($overview['button']['url'], THEME_NAMESPACE) ?>" class="mt-4 btn" title="<?=__($overview['button']['title'], THEME_NAMESPACE) ?>"><?=__($overview['button']['title'], THEME_NAMESPACE) ?></a>
          </div>
        <?php
        }
        ?>
      </div>
    </div>
  </section>
 

 <?php get_template_part('/partials/flexible-content/fc-testimonials', null, ['testimonials' => $testimonials['testimonial_fields']]); ?>
<div class="py-lg-5 py-0 mb-5">
<?php
    get_template_part('/partials/flexible-content/fc-cta-blocks', null, ['cta_blocks' => $cta_blocks]);
?>
</div>
  <?php get_template_part('/partials/fc-testimonials') ?>
</main>
<?php
get_footer();
