<?php
/**
* Template Name: Careers roles
*/
?>

<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$job_role = get_field('jr_roles');
$role_jobs = qc_job_role_posts($job_role);
$cta_blocks = get_field('cta_blocks');
$video = get_field('cr_video_text');
$testimonials = get_field('cr_testimonials');
$roles_posts = get_posts([
  'post_type' => 'role',
  'status' => 'publish',
  'numberposts' => -1,
]);
get_header();
?>
<main class="site__main c-roles" id="main">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 page-intro">
        <h2 class="page-intro__title"><?php the_title() ?></h2>
        <?php the_content() ?>
      </div>
      <div class="col-12 col-md-6">
        <figure class="role__img">
          <?= get_the_post_thumbnail( get_the_ID() ) ?>
        </figure>
      </div>
    </div>
    <div class="row">
      <?php
      foreach($roles_posts as $post) {
        get_template_part('/partials/news-card');
      }
      ?>
    </div>
  </div>
  <?php
  if($video) {
?>
<section class="post-section fc__img-text fc__img-text--left">
  <div class="container">
    <div class="row">
    <div class="col-12 col-md-6 fc__img-text-img d-flex">
        <?= $video['video_block']['video'] ?>
      </div>
      <div class="col-12 col-md-6 fc__img-text-text d-flex">
        <h2 class="post-section__title"><?= $video['video_block']['title'] ?></h2>
        <?= $video['video_block']['text'] ?>
        <button class="btn btn-primary"><?= $video['video_block']['btn_label'] ?></button>
      </div>
    </div>
  </div>
</section>
<?php get_template_part('/partials/flexible-content/fc-testimonials', null, ['testimonials' => $testimonials['testimonial_fields']]); ?>
<?php
    get_template_part('/partials/flexible-content/fc-cta-blocks', null, ['cta_blocks' => $cta_blocks]);
  }
?>
  <?php get_template_part('/partials/fc-testimonials') ?>
</main>
<?php
get_footer();
