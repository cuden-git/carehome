<?php
  $title = get_sub_field('title');
  $posts = get_sub_field('jobs');
  $btn_label = get_sub_field('btn_label');
?>
<section class="post-section fc__jobs">
  <div class="container">
    <h2 class="post-section__title post-section__title--white"><?= $title ?></h2>
    <div class="row">
    <?php
    foreach($posts as $post) {
      $job_role = get_field('careers_post_job_role', $post->ID);
      $job_location = get_field('career_care_home', $post->ID);
      $pay_rate = get_field('career_pay_rate', $post->ID);
      $shift_time = qc_get_job_type($post->ID);
    ?>
      <div class="col-12 col-md-4">
        <div class="fc__jobs-card d-flex">
          <h3 class="fc__jobs-card-title"><?= $job_role ?></h3>
          <div class="fc__jobs-card-tr d-flex">
            <h6 class="fc__jobs-card-tr-label"><?= __('Location', THEME_NAMESPACE) ?></h6>
            <p class="mb-0"><?= $job_location->post_title ?></p>
          </div>
          <div class="fc__jobs-card-tr d-flex">
            <h6 class="fc__jobs-card-tr-label"><?= __('Pay', THEME_NAMESPACE) ?></h6>
            <p class="mb-0"><?= $pay_rate ?></p>
          </div>
          <div class="fc__jobs-card-tr d-flex">
            <h6 class="fc__jobs-card-tr-label"><?= __('Shift Time', THEME_NAMESPACE) ?></h6>
            <p class="mb-0"><?= $shift_time['shift'] ?></p>
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