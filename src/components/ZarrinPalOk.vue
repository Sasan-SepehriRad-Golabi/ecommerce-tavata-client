<template>
    <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
        <v-card-subtile style="white-space:normal;">در حال بررسی اطللاعات خرید</v-card-subtile>
    </v-overlay>
    <v-row :style="{ 'margin-top': useMainStore().aph + 'px' }" class="justify-center">
        <v-col cols="12" sm="6" lg="4">
            <v-card class="w-100">
                <v-img class="w-100" style="height:200px;"
                    :src="result == 2 ?
                        `${processDev ? '../../src/client/cassets/images/congratulation.gif' : 'cassets/images/congratulation.gif'}` :
                        result == 1 ? `${processDev ? '../../src/client/cassets/images/failEmoji.png' : 'cassets/images/failEmoji.png'}` :
                            `${processDev ? '../../src/client/cassets/images/wonderEmoji.png' : 'cassets/images/wonderEmoji.png'}`"></v-img>
                <v-card-text v-if="result == 2" class="text-center text-green-darken-4 font-weight-bold">خرید با موفقیت
                    انجام
                    شد</v-card-text>
                <v-card-text v-else-if="result == 1" class="text-center text-red-darken-4">
                    <v-card-text>خرید موفقیت آمیز نبود</v-card-text>
                    <v-card-subtitle style="white-space:normal" class="mt-n3">در صورت کم شدن وجه مبلغ به حساب شما برگشت داده
                        خواهد شد</v-card-subtitle>
                </v-card-text>
                <v-card-text v-else class="text-center text-purple-darken-4">
                    <v-card-text>نتیجه خرید نامشخص می باشد</v-card-text>
                    <v-card-subtitle style="white-space:normal" class="mt-n3">در صورت کم شدن وجه مبلغ به حساب شما برگشت داده
                        خواهد شد</v-card-subtitle>
                </v-card-text>
                <v-divider class="w-75 bg-rd"></v-divider>
                <v-btn :class="['ma-6', result == 2 ? 'bg-green' : result == 1 ? 'bg-warning' : 'bg-purple']"
                    @click="this.$router.replace('/portfolio')">بازگشت
                    به
                    سایت</v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import { useMainStore } from '@/store/main';
import { PostData_normal } from '@/services/remotedatamodify';
export default {
    data() {
        return {
            overlay: true,
            result: 0,
            useMainStore: useMainStore,
            processDev: process.env.dev
        }
    },
    created() {
        // console.log(this.$route.fullPath)
        let status = this.$route.query.Status;
        if (status == "OK") {
            this.result = true;
        }
        else {
            this.result = false;
        }
        this.verifyBuy();
    },
    methods: {
        verifyBuy() {
            useMainStore().mps = true
            useMainStore().mpv = 0
            PostData_normal("user/verifyPay", { num: this.$route.query.Authority ? this.$route.query.Authority : -1 }, {
                onUploadProgress: (ProgressEvent) => {
                    useMainStore().mpv = Math.floor((ProgressEvent.loaded * 100) / ProgressEvent.total)
                }
            }, (err, res) => {
                // console.log(res)
                // console.log(err)
                useMainStore().mps = false;
                this.overlay = false;
                if (res && res.data && res.data.res && res.data.res == "R4") {
                    useMainStore().sn.isLogin = true
                    useMainStore().gtlis = true;
                }
                else {
                    useMainStore().sn.isLogin = false
                    useMainStore().gtlis = false;
                }
                if (err) {
                    useMainStore().mps = false;
                    useMainStore().mpv = 0;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بروز رسانی اطلاعات " }
                    useMainStore().sn.sn = true;
                    useMainStore().sn.snt = 2000
                    setTimeout(() => {
                        useMainStore().mpv = 0;
                        if (!useMainStore().gtlis) {
                            useMainStore().sn.sn = false;
                        }
                    }, 2000);
                    this.result = 0
                }
                else {
                    if (res && res.data && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "سیستم شما را شاسایی نکرد دوباره وارد شوید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            // useMainStore().sn.sn = false;
                            // this.$router.replace("/login")
                        }, 2000);
                        this.result = 0
                    }
                    else if (res && res.data && (res.data.res == "R51" || res.data.res == "R52" || res.data.res == "R53")) {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بروز رسانی اطلاعات " }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                        this.result = 0
                    }
                    else if (res && res.data && (res.data.res == "R54")) {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "درگاه زرین پال نتیجه ای برای تراکنش مورد نظر نشان نداد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 4000);
                        this.result = 0
                    }
                    else if (res && res.data && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "اطلاعات از زرین پال به روزرسانی شد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            // useMainStore().sn.sn = false;
                            // this.$router.replace("/login")
                        }, 2000);
                        if (res.data.resCode == "verified") {
                            this.result = 2;
                        }
                        else if (res.data.resCode == "notVerified") {
                            this.result = 1;
                        }
                        else {
                            this.result = 0
                        }
                    }
                }
            })
        }
    }
}
</script>