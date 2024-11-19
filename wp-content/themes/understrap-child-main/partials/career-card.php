<?php
$job_role = get_field('careers_post_job_role');
$close_date = get_field('career_closing_date');
$pay_rate = get_field('career_pay_rate');
$shift_job_type = qc_get_job_type(get_the_ID());//get_the_terms(get_the_ID(), 'careers-category');
$job_location = get_field('career_care_home');
?>
<div class="col-12 careers-list__card row">
  <div class="col-md-7 px-0">
    <h3 class="careers-list__card-title"><?= $job_role ?></h3>
  </div>
  <div class="col-md-5 px-0">
    <p><strong><?= __('Closing date', THEME_NAMESPACE) ?>: <?= $close_date; ?></strong></p>
  </div>
  <div class="col-md-9 px-0">    
    <p><strong><?= __('Posted:', THEME_NAMESPACE) ?></strong> <?php the_date('j M Y'); ?></p>
    <p><strong><?= __('Pay', THEME_NAMESPACE) ?>:</strong> <?= $pay_rate ?></p>
    <p><strong>Location:</strong> <?= $job_location->post_title ?></p>
    <?php
    if($shift_job_type['shift']) {
    ?>
    <p><strong><?= __('Shift Time', THEME_NAMESPACE) ?>:</strong> <?= $shift_job_type['shift'] ?></p>
    <?php
    }
    ?>
    <p class="temp-distance">Distance from location: <?= get_post_meta(get_the_ID(), 'ch_distance', true) ?></p>
  </div>
  <div class="col-md-3 d-flex align-items-center">
    <a href="<?php the_permalink() ?>" class="btn btn-primary text-white" title="<?php the_field('careers_archive_btn_label', 'option'); ?>"><?php the_field('careers_archive_btn_label', 'option'); ?></a>
  </div>
</div>