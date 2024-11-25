<?php
  $job_form_id = get_field('job_form_id', 'option');
?>
<!-- -->
<div id="job-apply-form" class="career-single__apply">
  <?= do_shortcode('[contact-form-7 id="' . $job_form_id . '" title="Job Application Form"]') ?>
</div>
