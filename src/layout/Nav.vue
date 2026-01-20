<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonPage, IonRouterOutlet } from '@ionic/vue';
import HomeIcon from '@/components/icons/HomeIcon.vue';
import AddBtn from '@/components/icons/AddIcon.vue';
import PayBtn from '@/components/icons/PayIcon.vue';
import CurUserIcon from '@/components/icons/CurUserIcon.vue';
import CarIcon from '@/components/icons/CarIcon.vue';
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <div class="flex items-center justify-between w-full h-full">

          <ion-tab-button tab="home" href="/tabs/home">
            <HomeIcon />
          </ion-tab-button>

          <ion-tab-button tab="car" href="/tabs/car">
            <CarIcon />
          </ion-tab-button>

          <ion-tab-button tab="add" href="/tabs/add">
            <AddBtn />
          </ion-tab-button>

          <ion-tab-button tab="pay" href="/tabs/pay">
            <PayBtn />
          </ion-tab-button>

          <ion-tab-button tab="user" href="/tabs/user">
            <CurUserIcon />
          </ion-tab-button>

        </div>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
