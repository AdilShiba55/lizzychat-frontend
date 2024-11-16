<template>
  <div class="typing-effect">
    <span>is typing</span>
    <span class="dots">&#9679;</span>
    <span class="dots">&#9679;</span>
    <span class="dots">&#9679;</span>
  </div>
</template>

<style>
.typing-effect {
  color: #5cb0b9;
  display: flex;
  align-items: end;
  gap: 10px;

  .dots {
    opacity: 0;
    font-size: 8px;
    margin-bottom: 2px;
    animation: typing-dots 1.5s infinite;
  }
}

@keyframes typing-dots {
  0% { opacity: 0; }
  25% { opacity: 1; }
  75% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
<script setup>
</script>