<?php
  $title = get_sub_field('title');
  $posts = get_sub_field('jobs');
  $btn_label = get_sub_field('btn_label');
?>
<section class="post-section fc__jobs">
  <div class="container">
    <h2 class="post-section__title"><?= $title ?></h2>
    <div class="row">
    <?php
    foreach($posts as $post) {
      $job_role = get_field('careers_post_job_role', $post->ID);
      $job_location = get_field('career_care_home', $post->ID);
      $pay_rate = get_field('career_pay_rate', $post->ID);
      $shift_time = qc_get_job_type($post->ID);
    ?>
      <div class="col-12 col-md-4">
        <div class="fc__jobs-card">
          <h3 class="fc__jobs-card"><?= $job_role ?></h3>
          <p><?= $job_location->post_title ?></p>
          <p><?= $pay_rate ?>
          <p><?= $shift_time ?></p>
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