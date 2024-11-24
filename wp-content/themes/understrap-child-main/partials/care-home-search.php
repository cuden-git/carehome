<?php
global $wp;

$location = "";

if(isset($_GET['location'])) {
  $location = $_GET['location'];
}

$distances = get_field('careers_distances', 'option');
$form_text = get_field('ch_archive_form_text', 'option');
?>

<div class="ch__search bg-primary">
  <h3 class="ch__search-titlem mb-3"><?= $form_text['title'] ?></h3>
  <div class="mb-3">
    <?= $form_text['text'] ?>
  </div>
  <form class="ch__search-form type-search d-flex">
    <div class="type-search__wrap d-flex flex-grow-1">
      <input id="address-search" name="location" type="text" value="<?= $location ?>" class="type-search__input flex-grow-1 me-3" autocomplete="off">
      <div class="type-search__results"></div>
    </div>
    <label class="flex-grow-1">
      <select name="ch_distance">
      <option value=""><?= __('Distance', THEME_NAMESPACE) ?></option>
        <?php
        foreach($distances as $distance) {
        ?>
          <option value="<?= $distance['distance'] ?>"<?php if (isset($_GET['ch_distance']) && $_GET['ch_distance'] === $distance['distance']) echo " selected"; ?>><?= $distance['distance'] ?></option>
        <?php
        }
        ?>
      </select>
    </label>
    <input type="submit" class="btn btn-secondary type-search__btn" value="Search" <?= (empty($location))? 'disabled' : null ?>>
  </form>
  <p class="text-center my-3"><?= __('Or', THEME_NAMESPACE) ?>
  <!-- -->
  <form class="ch__search-form d-flex">
    <?php get_template_part('partials/care-homes-select') ?>
    <input type="submit" class="btn btn-secondary" value="Search">
  </form>
</div>
