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
  <div class="bg-light-blue role-box-holder py-5 my-5">
  <div class="container">
    <div class="row ">
      <?php
      foreach($roles_posts as $post) {
        get_template_part('/partials/news-card');
      }
      ?>
    </div>
  </div>
</div>
  <?php
  if($video) {
?>
<section class="post-section fc__img-text fc__img-text--left py-lg-5 py-0 my-5">
  <div class="container">
    <div class="row">
    <div class="col-12 col-xl-7 col-lg-6 fc__img-text-img d-flex order-lg-1 order-5">
        <div class="video-holder">
          <?= $video['video_block']['video'] ?>
        </div>
      </div>
      <div class="col-12 col-xl-5 col-lg-6 fc__img-text-text d-flex order-lg-5 order-1 mb-lg-0 mb-5">
        <div class="ps-lg-4 ps-0">
          <h2 class="post-section__title"><?= $video['video_block']['title'] ?></h2>
          <?= $video['video_block']['text'] ?>
          <button class="btn btn-primary"><?= $video['video_block']['btn_label'] ?></button>
        </div>
      </div>
    </div>
  </div>
</section>

<?php   } 
  get_template_part('/partials/flexible-content/fc-testimonials', null, ['testimonials' => $testimonials['testimonial_fields']]); ?>
<div class="py-lg-5 py-0 mb-5">
<?php
    get_template_part('/partials/flexible-content/fc-cta-blocks', null, ['cta_blocks' => $cta_blocks]);

?>
</div>
  <?php get_template_part('/partials/fc-testimonials') ?>
</main>
<?php
get_footer();
