<script setup lang="ts">
import { IonHeader, IonToolbar, IonItem } from '@ionic/vue';
import NotificationIcon from '@/components/icons/NotificationIcon.vue';

defineProps({
  title: String,
});
</script>

<template>
  <ion-header>
    <ion-toolbar class="flex">
      <div class="flex h-full min-h-full w-full px-4">
        <div class="flex">

        </div>
        <div class="flex flex-1">
          <slot></slot>
        </div>
        <div class="flex gap-2">
          <ion-item :routerLink="'/notifications'">
            <div class="flex abc w-full h-full">
              <NotificationIcon></NotificationIcon>
            </div>
          </ion-item>
        </div>
      </div>
    </ion-toolbar>
  </ion-header>
</template>
