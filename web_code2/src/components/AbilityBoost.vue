<template>
  <div class="ability-boost" v-if="show" @animationend="hide">
    <div class="boost-content">
      <div class="boost-icon">💪</div>
      <div class="boost-text">能力+1</div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['hide'])

const hide = () => {
  emit('hide')
}
</script>

<style scoped>
.ability-boost {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  animation: popUp 1.5s ease-out forwards;
}

.boost-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background-color: var(--success-color);
  color: white;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-full, 9999px);
  box-shadow: var(--shadow-lg);
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.boost-icon {
  font-size: var(--font-size-2xl);
}

@keyframes popUp {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1) translateY(-50px);
  }
}
</style>