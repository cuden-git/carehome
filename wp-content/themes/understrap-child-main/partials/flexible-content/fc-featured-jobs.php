<?php
  $title = get_sub_field('title');
  $posts = get_sub_field('jobs');
  $btn_label = get_sub_field('btn_label');
?>
<section class="post-section fc__jobs py-5">
  <div class="container py-md-5 py-0">
    <h2 class="post-section__title post-section__title--white mb-5"><?= $title ?></h2>
    <div class="row ">
    <?php
    foreach($posts as $post) {
      $job_role = get_field('careers_post_job_role', $post->ID);
      $job_location = get_field('career_care_home', $post->ID);
      $pay_rate = get_field('career_pay_rate', $post->ID);
      $shift_time = qc_get_job_type($post->ID);
    ?>
      <div class="col-12 col-lg-4 col-md-6 mx-auto mb-lg-0 mb-4">
        <div class="fc__jobs-card d-flex">
          <h3 class="fc__jobs-card-title"><?= $job_role ?></h3>
          <div class="fc__jobs-card-tr d-flex">
            <div class="fc__jobs-card-tr-label"><strong><?= __('Location', THEME_NAMESPACE) ?>: </strong></div>
            <p class="mb-0 ps-3"><?= $job_location->post_title ?></p>
          </div>
          <div class="fc__jobs-card-tr d-flex">
            <div class="fc__jobs-card-tr-label"><strong><?= __('Pay', THEME_NAMESPACE) ?>: </strong></div>
            <p class="mb-0 ps-3"><?= $pay_rate ?></p>
          </div>
          <div class="fc__jobs-card-tr d-flex">
            <div class="fc__jobs-card-tr-label"><strong><?= __('Shift Time', THEME_NAMESPACE) ?>: </strong></div>
            <p class="mb-0 ps-3"><?= $shift_time['shift'] ?></p>
          </div>         
          <a href="<?= get_permalink($post->ID)?>" class="btn btn-primary" title="<?= $btn_label ?>"><?= $btn_label ?></a>
        </div>
      </div>
    <?php
    }
    wp_reset_postdata();
    ?>
    </div>
  </div>
</section>