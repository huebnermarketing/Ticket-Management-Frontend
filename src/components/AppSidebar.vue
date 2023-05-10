<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <div class="d-flex bg-black">
      <CSidebarBrand>
        <CIcon
          custom-class-name="sidebar-brand-full"
          :icon="logoNegative"
          :height="35"
        />
        <CIcon
          custom-class-name="sidebar-brand-narrow"
          :icon="sygnet"
          :height="35"
        />
      </CSidebarBrand>
      <CSidebarToggler
        class="d-none d-lg-flex"
        style="margin-left: auto"
        @click="$store.commit('toggleUnfoldable')"
      />
    </div>
    <AppSidebarNav />
  </CSidebar>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'
export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  setup() {
    const store = useStore()
    return {
      logoNegative,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
}
</script>
