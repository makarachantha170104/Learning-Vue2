<template>
  <div id="app" class="antialiased text-gray-900">
    <TheNavbar />
    <main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
export default {
  components: { TheNavbar },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
