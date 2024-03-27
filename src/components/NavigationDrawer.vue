<template>
    <v-locale-provider rtl>
        <v-navigation-drawer id="nvDrawer" ref="myNav" :style="{ 'top': useMainStore().aph + 'px !important' }"
            v-model="useMainStore().dwr" temporary="">
            <v-list-item class="my-5" v-if="u.uln"
                :prepend-avatar="u.upi ? `${baseUrl}${u.upi}` : '@/client/cassets/images/unknownUser.png'"
                :title="(u.upn && u.upln) ? `${u.upn} ${u.upln}` : (u.upn && !u.upln) ? `${u.upn}  کاربر` : (!u.upn && u.upln) ? `${u.upln}  کاربر` : 'کاربر ناشناس'"></v-list-item>
            <v-list-item class="my-5" v-else prepend-avatar="@/client/cassets/images/unknownUser.png"
                title="شما وارد نشده اید"></v-list-item>
            <v-divider></v-divider>
            <v-list lines="3" nav>
                <v-list-item class="my-5 font-weight-bold" @click="this.$router.replace('/')"
                    prepend-icon="mdi-view-dashboard" title="خانه" value="home"></v-list-item>
                <v-list-item class="my-5 font-weight-bold" :disabled="!u.uln ? true : false"
                    prepend-icon="mdi-message-bulleted" title="پیام های شما" @click="this.$router.replace('/userMessages')"
                    value="userMessages"></v-list-item>
                <v-list-item class="my-5 font-weight-bold " :disabled="!u.uln ? true : false"
                    prepend-icon="mdi-order-bool-descending" @click="this.$router.replace('/portfolio')" title="سفارشات شما"
                    value="userOrders"></v-list-item>
                <v-list-item class="my-5 font-weight-bold" @click="this.$router.replace('/contactAdmin')"
                    prepend-icon="mdi-card-account-phone" title="تماس با ما" value="contactUs"></v-list-item>
                <v-list-item class="my-5 font-weight-bold " prepend-icon="mdi-information-outline" title="درباره ما"
                    value="aboutUs"></v-list-item>
                <v-list-item class="my-5 font-weight-bold " @click="exit()" :disabled="!u.uln ? true : false"
                    prepend-icon="mdi-exit-to-app" title="خروج" value="exit"></v-list-item>
                <div style="width:10px;height:13px"></div>
            </v-list>
        </v-navigation-drawer>
    </v-locale-provider>
</template>
<script>
import { mapState } from 'pinia'
import { useMainStore } from "@/store/main"
import { baseURL, PostData_normal } from "@/services/remotedatamodify"
export default {
    data() {
        return {
            group: null,
            baseUrl: baseURL,
            useMainStore: useMainStore
        }
    },
    mounted() {
        setTimeout(() => {

            this.$refs["myNav"].$el.addEventListener("click", () => {
                useMainStore().dwr = !useMainStore().dwr;
            })
        }, 100);
    },
    computed: {
        ...mapState(useMainStore, ['u']),


    },
    methods: {
        exit() {
            PostData_normal("user/exit", {}, null, (err, res) => {
                if (err) {
                    useMainStore().mpv = 0;
                    this.iconsApplying = false;
                    useMainStore().mps = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. ممکن است اطلاعات به درستی ثبت نشده باشند. دوباره تلاش کنید" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        if (!useMainStore().gtlis) {
                            useMainStore().sn.sn = false;
                        }
                    }, 2000);
                }
                else {
                    if (res.data.res == "R1") {
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().u.uln = false;
                        useMainStore().u.upn = "";
                        useMainStore().u.upln = "";
                        useMainStore().u.upi = "";
                        useMainStore().u.bup = 0;
                        useMainStore().u.mr = 0;
                        useMainStore().u.mu = 0;
                        useMainStore().u.rep = 0;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "شما با موفقیت خارج شدید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else if (res.data.res == "R4") {
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما توسط سیستم شناسایی نشدید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else {
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. ممکن است اطلاعات به درستی ثبت نشده باشند. دوباره تلاش کنید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                }
            })
        }

    }
}
</script>
<style>
#nvDrawer {
    height: 100% !important;
}
</style>