<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$job_role = get_field('jr_roles');
$role_jobs = qc_job_role_posts($job_role);
$cta_blocks = get_field('cta_blocks');
$video = get_field('video_block');

get_header();
?>
<main class="site__main role" id="main">
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-5 page-intro align-items-center d-flex">
        <div>
          <h2 class="page-intro__title mb-3"><?php the_title() ?></h2>
          <?php the_content() ?>
          </div>
      </div>
      <div class="col-12 col-lg-7 align-items-center">
        <figure class="role__img">
          <?= get_the_post_thumbnail( get_the_ID() ) ?>
        </figure>
      </div>
    </div>
  </div>
<?php
  if($job_role && !empty($role_jobs)) {
?>

  <div class="post-section role__jobs pt-5 pb-3">
    <div class="container py-md-5 py-0">
      <div class="row">
        <div class="col-lg-10 mx-auto">
          <?php
            foreach($role_jobs as $job) {
              get_template_part('/partials/career-card', null, ['post_id' => $job->ID]);
            }
          ?>
          </div>
        </div>
    </div>
  </div>
<?php
  }
?>
<?php
  if($cta_blocks) {
    get_template_part('/partials/flexible-content/fc-cta-blocks', null, ['cta_blocks' => $cta_blocks]);
  }
?>
<?php
  if($video) {
?>
<section class="post-section fc__img-text fc__img-text--left pt-md-5 pt-4 pb-5">
  <div class="container py-lg-5 py-0">
    <div class="row">
    <div class="col-12 col-lg-7 fc__img-text-img d-flex order-lg-1 order-5">
      <div class="video-holder">
        <?= $video['video'] ?>
      </div>
      </div>
      <div class="col-12 col-lg-5 fc__img-text-text d-flex order-lg-5 order-1 mb-lg-0 mb-5">
        <h2 class="post-section__title"><?= $video['title'] ?></h2>
        <?= $video['text'] ?>
        <button class="btn btn-primary"><?= $video['btn_label'] ?></button>
      </div>
    </div>
  </div>
</section>
<?php
  //  get_template_part('/partials/flexible-content/fc-cta-blocks', null, ['cta_blocks' => $cta_blocks]);
  }
?>
</main>

<?php
get_footer();
