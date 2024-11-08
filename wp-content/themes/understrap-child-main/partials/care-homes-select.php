<?php
$ch_args = [
  'post_type' => 'care-home',
  'numberposts' => -1    
];
$care_homes = get_posts($ch_args);
?>
<label class="flex-grow-1">
  <select name="care_homes">
    <option value=""><?= __('Care Homes', THEME_NAMESPACE) ?></option>
    <?php
    foreach($care_homes as $care_home) {
    ?>
      <option value="<?= esc_url( get_permalink($care_home->ID) ) ?>"><?= $care_home->post_title ?></option>
    <?php
    }
    ?>
  </select>
</label>