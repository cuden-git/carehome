<?php
$faqs = get_field('faqs');

if($faqs) {
  $loop_index = 0;
?>
<div class="accordion faqs" id="faqs-accordion">
<?php
  foreach($faqs as $faq) {
?>
  <div class="accordion-item" data-aos="fade-up">
    <h2 class="accordion-header faqs__header<?= ($loop_index !== 0)? ' collapsed' : null ?>" data-bs-toggle="collapse" data-bs-target="#accordion-<?= $loop_index ?>"><?= $faq['question'] ?></h2>
    <div id="accordion-<?= $loop_index ?>" class="faqs__answer accordion-collapse collapse<?= ($loop_index === 0)? ' show' : null ?>" data-bs-parent="#faqs-acordion">
      <div class="accordion-body">
        <?= $faq['answer'] ?>
      </div>
    </div>
  </div>
<?php
    ++$loop_index;
  }
?>
</div>
<?php
}
?>
