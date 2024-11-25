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
$video = get_field('video_block');
get_header();
?>
<main class="site__main role" id="main">
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
  </div>
<?php
  if($job_role && !empty($role_jobs)) {
?>

  <div class="post-section role__jobs">
    <div class="container">
      <div class="col-md-8 mx-auto">
      <?php
        foreach($role_jobs as $job) {
          get_template_part('/partials/career-card', null, ['post_id' => $job->ID]);
        }
      ?>
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
<section class="post-section fc__img-text fc__img-text--left">
  <div class="container">
    <div class="row">
    <div class="col-12 col-md-6 fc__img-text-img d-flex">
        <?= $video['video'] ?>
      </div>
      <div class="col-12 col-md-6 fc__img-text-text d-flex">
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
