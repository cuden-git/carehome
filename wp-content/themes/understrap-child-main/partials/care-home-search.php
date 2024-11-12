<?php
global $wp;

$location = "";

if(isset($_GET['location'])) {
  $location = $_GET['location'];
}
$form_text = get_field('ch_archive_form_text', 'option');
?>

<div class="col-12">
  <h3 class="ch_search-title"><?= $form_text['title'] ?></h3>
  <?= $form_text['text'] ?>
  <form class="ch__search-form type-search d-flex" action="<?= add_query_arg( $_SERVER['QUERY_STRING'], '', home_url( $wp->request ) ) ?>">
    <div class="type-search__wrap d-flex flex-grow-1">
      <input id="address-search" type="text" class="type-search__input flex-grow-1" autocomplete="off">
      <div class="type-search__results"></div>
    </div>

    <input type="submit" class="btn btn-secondary type-search__btn" value="Search" disabled>
  </form>
  <p><?= __('OR', THEME_NAMESPACE) ?>
  <!-- -->
  <form class="ch__search-form d-flex">
    <?php get_template_part('partials/care-homes-select') ?>
    <input type="submit" class="btn btn-secondary" value="Search">
  </form>
</div>
