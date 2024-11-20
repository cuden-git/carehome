<?php
$faqs = get_field('faqs');

if($faqs) {
  $loop_index = 0;
  foreach($faqs as $faq) {
?>

<div class="accordion faqs" id="faqs-acordion">
  <div class="accordion-item">
    <h2 class="accordion-header faqs__header" data-bs-toggle="collapse" data-bs-target="#accordion-<?= $loop_index ?>"><?= $faq['question'] ?></h2>
    <div class="faqs__answer" id="accordion-<?= $loop_index ?>" class="accordion-collapse collapse<?= ($loop_index === 0)? ' show' : null ?>" data-bs-parent="#faqs-acordion">
      <div class="accordion-body">
        <?= $faq['answer'] ?>
      </div>
    </div>
  </div>
</div>

<?php
    ++$loop_index;
  }
}
?>
