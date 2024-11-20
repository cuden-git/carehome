<?php
$brochure = get_field('career_brochure', get_the_ID());
?>
<div class="career-single__sidebar">
  <!-- -->
  <form class="d-flex career-single__info-form">
    <label>
      <input type="email" class="w-100" name="" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" placeholder="<?= __('Email address', THEME_NAMESPACE) ?>" value="">
    </label>
    <input type="submit" class="btn btn-secondary" value="<?= __('Email address', THEME_NAMESPACE) ?>">
  </form>
  <!-- -->
  <?php
  if($brochure) {
  ?>
  <div class="career-single__sidebar-widget">
    <h6 class="career-single__sidebar-title"><?= __('Job Description PDF', THEME_NAMESPACE) ?></h6>
    <a href="<?= $brochure['url'] ?>" class="btn btn-primary" title="<?= __($brochure['title'], THEME_NAMESPACE) ?>"><?= __('Download now', THEME_NAMESPACE) ?></a>
  </div>
  <?php
  }
  ?>
  <!-- -->
  <div class="career-single__sidebar-widget">
    <h6 class="career-single__sidebar-title"><?= __('View Home', THEME_NAMESPACE) ?></h6>
    <a href="" class="btn btn-primary" title="<?= __('View Home', THEME_NAMESPACE) ?>"><?= __('View Home', THEME_NAMESPACE) ?></a>
  </div>
  <!-- -->
  <div class="career-single__sidebar-widget">
    <h6 class="career-single__sidebar-title"><?= __('View Home', THEME_NAMESPACE) ?></h6>
    <a href="#" class="btn btn-primary" title=""><?= __('Apply Now', THEME_NAMESPACE) ?></a>
  </div>
</div>
