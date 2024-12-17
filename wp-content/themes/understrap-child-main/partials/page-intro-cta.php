<?php
$cta_btn = get_field('page_intro_cta');

if($cta_btn) {
?>
<a href="<?= $cta_btn['url'] ?>" class="btn btn-primary mt-4" title="<?= __($cta_btn['title'],THEME_NAMESPACE) ?>"><?= __($cta_btn['title'],THEME_NAMESPACE) ?></a>
<?php
}
