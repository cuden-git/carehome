<?php
$careers_cats = qc_get_careers_cats();
$careers_distances = get_field('careers_distances', 'option');
$ch_args = [
  'post_type' => 'care-home',
  'numberposts' => -1    
];
$care_homes = get_posts($ch_args);
?>
<form class="careers-list__filters bg-primary">
  <fieldset class="d-flex flex-column">
    <label>
      <select name="careers_distance"<?php if(!isset($_GET['careers_location']) || $_GET['careers_location'] === "") echo ' disabled'?>>
        <option<?php if(!isset($_GET['careers_location']) || $_GET['careers_location'] === "") echo " selected" ?>><?= __('Distance', THEME_NAMESPACE) ?></option>
        <?php
        foreach($careers_distances as $distance) {
        ?>
          <option value="<?= $distance['distance'] ?>"<?php if (isset($_GET['careers_distance']) && $_GET['careers_distance'] === $distance['distance']) echo " selected"; ?>><?= $distance['distance'] ?></option>
        <?php
        }
        ?>
      </select>
    </label>
    <label class="flex-grow-1">
      <select name="care_homes">
        <option value=""><?= __('Care Homes', THEME_NAMESPACE) ?></option>
        <?php
        foreach($care_homes as $care_home) {
        ?>
          <option value="<?= get_permalink($care_home->ID) ?>"><?= $care_home->post_title ?></option>
        <?php
        }
        ?>
      </select>
    </label>
  </fieldset>
<?php
  foreach($careers_cats as $key=>$cat) {
?>
  <fieldset class="d-flex flex-column">
  <legend><?= $key ?></legend>
<?php
    foreach($careers_cats[$key] as $child_cat) {
?>
  <label class="d-flex">
    <input type="checkbox" name="term_ids[]" value="<?= $child_cat['term_id'] ?>"<?php if (isset($_GET['term_ids']) && in_array($child_cat['term_id'], $_GET['term_ids'])) echo " checked"; ?>>
    <?= $child_cat['name'] ?>
  </label>
<?php
    }
?>
  </fieldset>
<!-- Hidden fields for primary form data -->
 <input type="hidden" name="form_level" value="secondary">
<?php
  if(!empty($primary_form_data)) {
    foreach($primary_form_data as $key=>$form_val) {
?>
  <input type="hidden" name="<?= $key ?>" value="<?= $form_val ?>">
<?php
    }
  }
?>
<!-- end hidden fields -->
<?php
  }
?>
  <input type="submit" class="btn btn-secondary d-block" value="<?= __('Search', THEME_NAMESPACE) ?>">
</form>