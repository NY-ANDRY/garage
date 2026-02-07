<script setup lang="ts">
import { IonHeader, IonToolbar, IonItem } from '@ionic/vue';
import NotificationIcon from '@/components/icons/NotificationIcon.vue';
import UserBtn from '@/components/buttons/UserBtn.vue';
defineProps({
  title: String,
});
</script>

<template>
  <ion-header>
    <ion-toolbar class="flex">
      <div class="flex h-full min-h-full w-full pl-4 pr-1">
        <div class="flex">

        </div>
        <div class="flex flex-1">
          <slot></slot>
        </div>
        <div class="flex gap-0">
          <ion-item :routerLink="'/notifications'" class="item-red">
            <div class="flex abc w-full h-full">
              <NotificationIcon />
            </div>
          </ion-item>
        </div>
      </div>
    </ion-toolbar>
  </ion-header>
</template>
