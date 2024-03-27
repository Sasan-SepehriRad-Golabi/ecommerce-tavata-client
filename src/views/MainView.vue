<template>
    <v-app>
        <socket />
        <AppBar />
        <MainProgressBar />
        <router-view></router-view>
        <NavigationDrawer />
        <MainOverlayComponent />
        <MainSnakBar />
    </v-app>
</template>
<script>
import socket from "@/components/socket.vue"
import AppBar from "@/components/AppBar.vue"
import NavigationDrawer from "@/components/NavigationDrawer.vue"
import MainOverlayComponent from "@/components/MainOverlayComponent.vue"
import MainSnakBar from "@/components/MainSnakBar.vue"
import MainProgressBar from "@/components/MainProgressBar.vue"
import { useMainStore } from "@/store/main"
export default {
    data() {
        return {

        }
    },
    computed: {
        displayName() {
            return this.$vuetify.display.name
        }
    },
    created() {
        //console.log(this.$vuetify.display.name)
        if (this.$vuetify.display.name == 'xs') {
            //console.log("heeeee")
            useMainStore().aph = 70;
        }
        else {
            useMainStore().aph = 110;
        }
        console.log(this.$route.fullPath)
        console.log(this.$router.options.routes)
        console.log(window.location.pathname)
        console.log(window.location.search)
        let IfPathExist = null;
        this.$router.options.routes.forEach((item, index) => {
            if (item.path.split("/")[1] == window.location.pathname.split("/")[1]) {
                IfPathExist = true;
            }
        })
        console.log(this.$route.path)
        if (IfPathExist) {
            this.$router.replace(`${window.location.pathname}${window.location.search}`)
        }
        else {
            this.$router.replace("/")
        }
    },
    watch: {
        displayName(newVal) {
            if (newVal == 'xs') {
                //console.log("heeeee")
                useMainStore().aph = 70;
                //console.log(useMainStore().aph)
            }
            else {
                useMainStore().aph = 110;
                //console.log(useMainStore().aph)
            }
        }
    },
    components: {
        AppBar, NavigationDrawer, MainOverlayComponent, MainSnakBar, MainProgressBar, socket
    }
}
</script>
<style>
.v-menu {
    z-index: 34000004 !important;
}
</style>