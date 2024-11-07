<div class="col-12">
  <div class="col-md-8">
    <h3><?php the_title() ?></h3>
    <p>Distance from location: <?= get_post_meta(get_the_ID(), 'ch_distance', true) ?></p>
    <p><?= __('Closing date', THEME_NAMESPACE) ?><?php the_date(' j M Y'); ?></p>
  </div>
  <div class="col-md-4">
    <a href="<?php the_permalink() ?>" class="btn btn-secondary" title="<?php the_field('careers_archive_btn_label', 'option'); ?>"><?php the_field('careers_archive_btn_label', 'option'); ?></a>
  </div>
</div>