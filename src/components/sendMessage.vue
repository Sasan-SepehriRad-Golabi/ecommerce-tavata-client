<template>
    <v-row class="justify-center align-center" :style="{ 'margin-top': useMainStore().aph + 'px' }">
        <v-col cols="12" sm="6" lg="4">
            <v-locale-provider rtl>
                <v-card class="elevation-2 rounded-lg text-center">
                    <template #prepend-icon>
                        <v-icon>mdi-message-bulleted</v-icon>
                    </template>
                    <template #title>
                        <span class="text-red-darken-3 text-subtitle2">ارسال پیام به ادمین</span>
                    </template>
                    <template #text>
                        <v-text-field v-model="mesSub" class="w-100 mb-3" type="outlined" hint="موضوع پیام"
                            persistent-hint></v-text-field>
                        <v-textarea v-model="mesText" rows="5" no-resize prepend-inner-icon="mdi-comment"></v-textarea>
                    </template>
                    <v-card-actions>
                        <v-btn block :loading="btnLoading" @click="sendMessage" class="bg-red">ارسال پیام</v-btn>
                    </v-card-actions>
                </v-card>
            </v-locale-provider>
        </v-col>
    </v-row>
</template>
<script>
import { useMainStore } from "@/store/main"
import { PostData_normal } from "@/services/remotedatamodify"
export default {
    data() {
        return {
            useMainStore: useMainStore,
            mesSub: "",
            mesText: "",
            btnLoading: false
        }
    },
    methods: {
        sendMessage() {
            useMainStore().mps = true;
            this.btnLoading = true;
            PostData_normal("user/sendMessage", { mesSub: this.mesSub, mesText: this.mesText }, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.floor(progressEvent.loaded * 100 / progressEvent.total)
                }
            }, (err, ress) => {
                useMainStore().mps = false;
                this.btnLoading = false;
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
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ارسال اطلاعات" }
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
                    if (res && res.data && res.data.res == "R1") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات با موفقیت ارسال شد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else if (res && res.data && res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید. دوباره وارد شوید" }
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
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ارسال اطلاعات" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false
                            }
                        }, 2000);
                    }
                }
            })
        }
    }
}
</script>