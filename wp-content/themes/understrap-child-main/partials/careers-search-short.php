<?php
$roles_rows = get_field('careers_job_roles', 'option');
$form_text = get_field('form_text', 'option');
?>


<div  class="careers-list__search careers-list__search--short d-flex">
  <div class="careers-list__search-text">
    <h2 class="careers-list__search-title mb-4"><?= $form_text['title'] ?></h2>
    <div>
    <?= $form_text['text'] ?>
    </div>
  </div>
  <form action="<?= get_post_type_archive_link('career') ?>">
    <fieldset class="type-search d-flex careers-list__search-fields">
      <label class="type-search__wrap flex-grow-1 careers-list__search-label">
        <input type="text"  class="type-search__input" name="careers_location" autocomplete="off" placeholder="<?= __('Town or Postcode', THEME_NAMESPACE) ?>" value="<?php if (isset($_GET['careers_location'])) echo $_GET['careers_location'] ?>">
        <div class="type-search__results"></div>
      </label>
      <input type="submit" class="btn btn-secondary flex-grow-1" value="<?= __('Search', THEME_NAMESPACE) ?>">
    </fieldset>
  </form>
  <p class="careers-list__search-or d-flex pb-0 mb-0">Or</p>
  <form action="<?= get_post_type_archive_link('career') ?>">
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
      <input type="submit" class="btn btn-secondary flex-grow-1" value="<?= __('Search', THEME_NAMESPACE) ?>">
    </fieldset>
  </form>
</div>
