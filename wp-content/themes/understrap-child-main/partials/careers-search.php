<?php
$roles_rows = get_field('careers_job_roles', 'option');
?>
<div  class="careers-list__search careers-list__search--flat">
  <form>
    <fieldset class="type-search d-flex careers-list__search-fields">
      <label class="flex-grow-1 careers-list__search-label">
        <select name="careers_role">
          <option value=""><?= __('Role', THEME_NAMESPACE) ?></option>
          <?php
            foreach($roles_rows as $row) {
          ?>
          <option value="<?= $row['job_role'] ?>"<?php if (isset($_GET['careers_role']) && $_GET['careers_role'] === $row['job_role']) echo " selected"; ?>><?= $row['job_role'] ?></option>
          <?php
            }
          ?>
        </select>
      </label>
      <label class="type-search__wrap flex-grow-1 careers-list__search-label">
        <input type="text"  class="type-search__input" name="careers_location" autocomplete="off" placeholder="<?= __('Town or Postcode', THEME_NAMESPACE) ?>" value="<?php if (isset($_GET['careers_location'])) echo $_GET['careers_location'] ?>">
        <div class="type-search__results"></div>
      </label>
       <label class="flex-grow-1 careers-list__search-label">
        <input type="text" name="careers_keyword" placeholder="<?= __('Keyword', THEME_NAMESPACE) ?>" value="<?php if (isset($_GET['careers_keyword'])) echo $_GET['careers_keyword'] ?>">
      </label>
      <!-- Hidden fields for secondary form data -->
      <input type="hidden" name="form_level" value="primary">
      <?php
        if(!empty($secondary_form_data)) {
          foreach($secondary_form_data as $key=>$form_val) {
            if(is_array($form_val)) {
              foreach($form_val as $inner_key=>$inner_val) {
              ?>
              <input type="hidden" name="<?= $key ?>[]" value="<?= $inner_val ?>">
            <?php
              }
            }else {
      ?>
        <input type="hidden" name="<?= $key ?>" value="<?= $form_val ?>">
      <?php
            }
          }
        }
      ?>
      <!-- end hidden fields -->
      <input type="submit" class="btn btn-primary flex-grow-1" value="<?= __('Submit', THEME_NAMESPACE) ?>">
    </fieldset>
  </form>
</div>
