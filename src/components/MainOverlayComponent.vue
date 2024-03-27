<template>
    <v-overlay id="mainOverlay" v-model="mol">
        <v-row dense class="justify-center align-center h-screen w-100">
            <div class="d-inline-flex flex-column">
                <img src="@/client/cassets/images/loading.gif" width="150px" height="150px" />
                <span class="my-n4 text-red-darken-4 font-weight-bold"><v-card-text
                        :class="['font-weight-bold', checkMobile ? 'text-red' : 'text-white']">در حال دریافت
                        اطلاعات</v-card-text></span>
            </div>
        </v-row>
    </v-overlay>
</template>
<script>
import { useMainStore } from '@/store/main';
import { PostData_normal } from "@/services/remotedatamodify"
export default {
    data() {
        return {

        }
    },
    computed: {
        mol() {
            return useMainStore().mol;
        },
        checkMobile() {
            let name = this.$vuetify.display.name;
            if (name == "xs" || name == "sm") {
                return true;
            }
            else {
                return false;
            }
        }
    },
    created() {
        useMainStore().mol = true;
        this.getUserInfos();
    },
    methods: {
        getUserInfos() {
            PostData_normal("user/giin", {}, null, (err, res) => {
                //console.log(res)
                useMainStore().mol = false;
                if (err) {
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "error", alT: "توجه", alt: "در دریافت اطلاعات خطایی رخ داد. از اتصال اینترنت خود مطمعن شوید و دوباره تلاش نمایید" }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        if (!useMainStore().gtlis) {
                            useMainStore().sn.sn = false;
                        }
                    }, 2000);
                }
                else {
                    //console.log(res.data);
                    var result = res.data[0];
                    if (result.res == "R4") {
                        useMainStore().u.uc = false;
                        useMainStore().u.uln = false;
                        clearInterval(useMainStore().u.gc);
                        useMainStore().al = { alC: "error", alT: "توجه", alt: "مشکل در تایید هویت. لطفا دوباره وارد شوید" }
                        useMainStore().sn.isLogin = true
                        useMainStore().gtlis = true;
                        setTimeout(() => {
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else if (result.res == "R5") {
                        clearInterval(useMainStore().u.gc);
                        useMainStore().u.uc = false;
                        useMainStore().u.uln = false;
                        setTimeout(() => {
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else if (result.res == "update2") {
                        clearInterval(useMainStore().u.gc);
                        useMainStore().u.uln = true;

                        if (res.data[1] && (res.data[1]).length > 0) {
                            let userInfo = (res.data[1])[0];
                            useMainStore().u.upn = userInfo.up.upn;
                            useMainStore().u.upln = userInfo.up.upln;
                            useMainStore().u.upi = userInfo.up.upi;
                            useMainStore().u.mr = userInfo.mr;
                            useMainStore().u.mu = userInfo.mu;
                            useMainStore().u.rep = userInfo.rep;
                            useMainStore().u.bup = userInfo.bup;
                            useMainStore().u.uc = userInfo.uc;
                            //console.log("*******")
                            //console.log(useMainStore().u.rep)
                        }
                        setTimeout(() => {
                            useMainStore().wd = true;
                            useMainStore().sn.sn = false;
                            if (this.$route.fullPath == "/") {
                                this.$router.replace("/");
                            }
                        }, 2000);
                    }
                    else if (result.res == "update1") {
                        clearInterval(useMainStore().u.gc);
                        useMainStore().u.uln = true;

                        //console.log(res.data[1]);
                        if (res.data[1] && (res.data[1]).length > 0) {
                            let userInfo = (res.data[1])[0];
                            useMainStore().u.upn = userInfo.up.upn;
                            useMainStore().u.upln = userInfo.up.upln;
                            useMainStore().u.upi = userInfo.up.upi;
                            useMainStore().u.mr = userInfo.mr;
                            useMainStore().u.mu = userInfo.mu;
                            useMainStore().u.rep = userInfo.rep;
                            useMainStore().u.bup = userInfo.bup;
                            useMainStore().u.uc = userInfo.uc;
                            //console.log("*******")
                            //console.log(useMainStore().u.rep)
                        }
                        setTimeout(() => {
                            useMainStore().wd = true;
                            if (this.$route.fullPath == "/") {
                                this.$router.replace("/");
                            }
                            useMainStore().sn.sn = false;
                        }, 2000);
                    }
                    else if (result.res == "update0") {
                        clearInterval(useMainStore().u.gc);

                        useMainStore().u.uln = true;
                        if (res.data[1] && (res.data[1]).length > 0) {
                            let userInfo = (res.data[1])[0];
                            useMainStore().u.upn = userInfo.up.upn;
                            useMainStore().u.upln = userInfo.up.upln;
                            useMainStore().u.upi = userInfo.up.upi;
                            useMainStore().u.mr = userInfo.mr;
                            useMainStore().u.mu = userInfo.mu;
                            useMainStore().u.rep = userInfo.rep;
                            useMainStore().u.bup = userInfo.bup;
                            useMainStore().u.uc = userInfo.uc;
                            //console.log("*******")
                            //console.log(useMainStore().u.rep)
                        }
                        setTimeout(() => {
                            useMainStore().wd = true;
                            useMainStore().sn.sn = false;
                            if (this.$route.fullPath == "/") {
                                this.$router.replace("/");
                            }
                        }, 2000);

                    }
                    else if (result.res == "blocked") {
                        clearInterval(useMainStore().u.gc);
                        useMainStore().u.uln = "blocked";
                        useMainStore().u.uc = false;
                        setTimeout(() => {
                            useMainStore().sn.sn = false;
                        }, 2000);

                    }
                    else {
                        clearInterval(useMainStore().u.gc);
                    }
                }
            })
        }
    }
}
</script>
<style>
#mainOverlay .v-overlay__content {
    width: 100% !important;
}
</style>