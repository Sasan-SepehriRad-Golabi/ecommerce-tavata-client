<template>
    <v-locale-provider rtl>
        <v-divider class="bg-red w-75"></v-divider>
        <v-row class="justify-center w-100" style="margin:0 !important">
            <v-col cols="12">
                <v-card class="elevation-0  w-100 mt-n5" style="min-height:300px">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-card-title>
                                <v-avatar>
                                    <v-img src="@/client/cassets/images/palm-tree-animation.gif"></v-img>
                                </v-avatar>
                                <span class="mx-2 text-red font-weight-bold" style="letter-spacing:8px;">شرکت تاواتا</span>
                            </v-card-title>
                            <v-card-text>
                                <v-list-item>
                                    <v-list-item-title>شماره های تماس</v-list-item-title>
                                    <v-list-item-subtitle class="my-3 mr-5">{{ contactPhones &&
                                        contactPhones.length > 3 ? contactPhones : 'هنوز شماره های تماس وارد نشده اند'
                                    }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-card-text>
                            <v-list-item>
                                <v-list-item-title>آدرس شرکت</v-list-item-title>
                                <v-list-item-subtitle class="my-3 mr-5">{{ address && address.length > 3 ? address :
                                    'هنوز آدرسی وارد نشده است'
                                }} </v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>ما را در شبکه های اجتماعی دنبال کنید</v-list-item-title>
                                <v-list-item-subtitle class="my-3 mr-5">
                                    <v-icon class="text-blue-darken-4 mx-2" @click="twitterAddress">mdi-twitter</v-icon>
                                    <v-icon class="text-blue-darken-4 mx-2" @click="instagramAddress">mdi-instagram</v-icon>
                                    <v-icon class="text-blue-darken-4 mx-2" @click="linkedinAddress">mdi-linkedin</v-icon>
                                    <div class="d-inline-block"
                                        style="border:1px solid black;min-width:10px;min-height: 10px;">
                                        <a referrerpolicy='origin' target='_blank'
                                            href='https://trustseal.enamad.ir/?id=470324&Code=qBdCWAe6tGhhH0ng6atZXVjYHoVaGIeH'><img
                                                referrerpolicy='origin'
                                                src='https://trustseal.enamad.ir/logo.aspx?id=470324&Code=qBdCWAe6tGhhH0ng6atZXVjYHoVaGIeH'
                                                alt='' style='cursor:pointer' Code='qBdCWAe6tGhhH0ng6atZXVjYHoVaGIeH'></a>
                                    </div>
                                </v-list-item-subtitle>
                            </v-list-item>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3494.806660569749!2d52.1040998!3d28.8446156!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUwJzQzLjQiTiA1MsKwMDYnMjMuNSJF!5e0!3m2!1sen!2sus!4v1711014233244!5m2!1sen!2sus"
                                height="300" style="border:0;width:100%" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>

                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-locale-provider>
</template>
<script>
import { PostData_normal } from '@/services/remotedatamodify';
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {
            contactPhones: "",
            address: "",
            instagramAddress: "",
            twitterAddress: "",
            linkedinAddress: ""
        }
    },
    created() {
        this.getFooter()
    },
    methods: {
        getFooter() {
            PostData_normal("/user/getFooter", {}, {}, (err, res) => {
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
                }
                else {
                    if (res && res.data && res.data.res == "R1") {
                        if (res.data.info && res.data.info.length > 0) {
                            this.contactPhones = res.data.info[0].contactPhones && res.data.info[0].contactPhones.length > 3 ? res.data.info[0].contactPhones : "";
                            this.address = res.data.info[0].address && res.data.info[0].address.length > 3 ? res.data.info[0].address : "";
                            this.instagramAddress = res.data.info[0].instagramAddress && res.data.info[0].instagramAddress.length > 3 ? res.data.info[0].instagramAddress : "";
                            this.twitterAddress = res.data.info[0].twitterAddress && res.data.info[0].twitterAddress.length > 3 ? res.data.info[0].twitterAddress : "";
                            this.linkedinAddress = res.data.info[0].linkedinAddress && res.data.info[0].linkedinAddress.length > 3 ? res.data.info[0].linkedinAddress : "";
                        }
                    }
                    else if (res && res.data && res.data.res == "R4") {
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
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mpv = 0;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در بروز رسانی اطلاعات تماس  " }
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