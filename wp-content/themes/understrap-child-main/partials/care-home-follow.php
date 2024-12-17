<?php
$fb_link = get_field('ch_facebook_url');
$follow_text = get_field('ch_follow_us_text', 'option');

if($fb_link) {
?>
<div class="care-home__follow">
  <?php
    if(!empty($follow_text['title'])) {
  ?>
    <h4 class="care-home__follow-title"><i class="icon-facebook"></i> <?= $follow_text['title'] ?></h4>
  <?php
    }

    if(!empty($follow_text['title'])) {
  ?>
    <?= $follow_text['text'] ?>
  <?php
    }
  ?>
  <a href="<?= $fb_link ?>" class="btn btn-primary care-home__follow-btn" target="_blank" title="<?= __($follow_text['btn_label'], THEME_NAMESPACE) ?>"><?= __($follow_text['btn_label'], THEME_NAMESPACE) ?></a>
</div>
<?php
}
?>