<?php
$career_id = (isset($args['post_id']))? $args['post_id'] :get_the_ID();
$job_role = get_field('careers_post_job_role', $career_id);
$close_date = get_field('career_closing_date', $career_id);
$pay_rate = get_field('career_pay_rate', $career_id);
$shift_job_type = qc_get_job_type($career_id);//get_the_terms(get_the_ID(), 'careers-category');
$job_location = get_field('career_care_home', $career_id );
?>
<div class="careers-list__card p-4">
  <div class="container px-0">
    <div class="row">
      <div class="col-lg-8  ">
        <h3 class="careers-list__card-title"><?= $job_role ?></h3>
        <p><strong><?= __('Posted:', THEME_NAMESPACE) ?></strong> <?= get_the_date('j M Y', $career_id); ?></p>
      </div>
      <div class="col-lg-4 pt-lg-0 pt-3">
        <p class="closing-date text-lg-end text-start"><strong><?= __('Closing date', THEME_NAMESPACE) ?></strong>: <?= $close_date; ?></p>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-xl-9 col-lg-8 py-0">    
        <p><strong><?= __('Pay', THEME_NAMESPACE) ?>:</strong> <?= $pay_rate ?></p>
        <p><strong>Location:</strong> <?= $job_location->post_title ?></p>
        <?php
        if($shift_job_type['shift']) {
        ?>
        <p><strong><?= __('Shift Time', THEME_NAMESPACE) ?>:</strong> <?= $shift_job_type['shift'] ?></p>
        <p><strong><?= __('Type', THEME_NAMESPACE) ?>:</strong> <?= $shift_job_type['job'] ?></p>
        <?php
        }
        ?>
        <p class="temp-distance">ID = <?= $career_id ?>; Distance from location: <?= get_post_meta($career_id, 'ch_distance', true) ?></p>
      </div>
      <div class="col-lg-4 col-xl-3 d-flex align-items-center mt-4 mt-lg-0">
        <a href="<?php the_permalink() ?>" class="btn btn-primary text-white" title="<?php the_field('careers_archive_btn_label', 'option'); ?>"><?php the_field('careers_archive_btn_label', 'option'); ?></a>
      </div>
    </div>
  </div>
</div>