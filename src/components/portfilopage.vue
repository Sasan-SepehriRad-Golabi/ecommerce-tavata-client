<template>
    <v-dialog v-model="payChoicesDialog">
        <v-locale-provider rtl>
            <v-card class="pa-3">
                <v-card-actions>
                    <v-row class="justify-center">
                        <v-col class="d-flex justify-center">
                            <v-btn @click="payProduct(elementThatIsPaying.pfn, elementThatIsPaying.pim, elementThatIsPaying.pid,
                                elementThatIsPaying.tid, elementThatIsPaying.pnums, elementThatIsPaying.ppim, elementThatIsPaying.pn,
                                elementThatIsPaying.pprice)" class="bg-red">خرید توسط ارتباط مستقیم ادمین با
                                شما</v-btn>
                        </v-col>
                        <v-col class="d-flex justify-center">
                            <v-btn class="bg-red" @click="zarrinPal()">خرید از طریق درگاه بانکی</v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-locale-provider>
    </v-dialog>
    <v-dialog v-model="paydialog">
        <v-locale-provider rtl>
            <v-row class="justify-center align-center">
                <v-col cols="12" sm="6" lg="4">
                    <v-card elevation="2" class="rounded-lg" style="min-height:300px">
                        <v-card-text>
                            <span class="mx-3">کاربر گرامی </span>
                            <v-avatar size="40">
                                <v-img :src="`${baseUrl}${product.im}`"></v-img>
                            </v-avatar>
                            <span class="text-red-darken-3 font-weight-bold mx-3">{{ product.fName }}</span>
                        </v-card-text>
                        <v-divider class="w-75 bg-red text-red my-2"></v-divider>
                        <v-card-text>
                            <span class="mx-2">کالای درخواستی</span>
                            <v-avatar size="40">
                                <v-img :src="`${baseUrl}${product.ppim}`"></v-img>
                            </v-avatar>
                            <span class="text-red-darken-3 font-weight-bold mx-3">{{ product.pn }}</span>
                        </v-card-text>
                        <v-divider class="w-75 bg-red text-red my-2"></v-divider>
                        <v-card-text>
                            <span class="mx-2">تعداد درخواستی</span>
                            <v-card class="d-table w-100 table" style="background-color:darkgray">
                                <div class="d-table-row my-5 text-center tableRow">
                                    <div class="d-table-cell">تعداد</div>
                                    <div class="d-table-cell">قیمت هر واحد</div>
                                    <div class="d-table-cell">قیمت کل</div>
                                </div>
                                <div class="d-table-row my-5 text-center tableRow">
                                    <div class="d-table-cell">{{ product.pnums }}</div>
                                    <div class="d-table-cell">{{ product.pprice }}</div>
                                    <div class="d-table-cell">{{ product.pnums * product.pprice }}</div>
                                </div>
                            </v-card>
                        </v-card-text>
                        <v-divider class="w-75 bg-red text-red my-2"></v-divider>
                        <v-card-text class="text-justify">
                            کالای مورد نظر شما در لیست بررسی قرار گرفت. جهت پرداخت وجه و سایر مراحل از طرف تیم
                            <span class="mx-2 text-red-darken-3 font-weight-bold " style="letter-spacing:2px;font-size:20px"
                                @click="this.$router.replace('/')">تاواتا</span>با شما
                            تماس گرفته خواهد شد
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-locale-provider>
    </v-dialog>
    <v-locale-provider rtl>
        <v-row v-if="gettingProducts" :style="{ 'margin-top': aph + 'px' }">
            <v-col cols="12" sm="6" md="4">
                <v-skeleton-loader type="article"></v-skeleton-loader>
            </v-col>
            <v-col
                v-if="this.$vuetify.display.name == 'sm' || this.$vuetify.display.name == 'md' || this.$vuetify.display.name == 'lg' || this.$vuetify.display.name == 'xxl'"
                cols="12" sm="6" md="4">
                <v-skeleton-loader type="article"></v-skeleton-loader>
            </v-col>
            <v-col
                v-if="this.$vuetify.display.name == 'md' || this.$vuetify.display.name == 'lg' || this.$vuetify.display.name == 'xxl'"
                cols="12" sm="6" md="4">
                <v-skeleton-loader type="article"></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row :style="{ 'margin-top': useMainStore().aph + 'px' }" v-else>
            <v-col cols="12">
                <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
                    <v-tab value="reservs">در حال انتظار</v-tab>
                    <v-tab value="boughts">خریداری شده</v-tab>
                    <v-tab value="cancels">لغو شده</v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item value="reservs" class="mt-4">
                        <v-row dense>
                            <v-card class="w-100 my-2 elevation-0" v-for="(product, index) in reserverdProducts"
                                :key="index">
                                <v-row dense>
                                    <v-col cols="4">
                                        <div class="align-center d-flex flex-column justify-center">
                                            <v-avatar class="d-flex"
                                                @click="removePRoductFromReserve(product.tid, product.peri)">
                                                <v-icon color="red">mdi-trash-can</v-icon>
                                            </v-avatar>
                                            <div style="width:1px;height:50px"></div>
                                            <v-img style="min-width: 100px;" class="rounded-lg elevation-3 d-flex"
                                                :src="product.pim && product.pim.length > 0 ? `${baseUrl}${product.pim}` : `${processDev ? '../../src/client/cassets/images/unKnownProduct.png' : 'cassets/images/unKnownProduct.png'}`">
                                            </v-img>
                                        </div>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-row class="w-100 h-100 align-center justify-center">
                                            <v-col cols="12">
                                                <v-row class="justify-center align-center w-100 h-100">
                                                    <v-list-item class="w-100 mt-2">
                                                        <v-list-item-title class="text-justify mr-5">
                                                            نام محصول
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="pa-3 text-center mt-5">
                                                            <div class="d-flex flex-column">
                                                                <span>{{ product.pn }}</span>
                                                                <span>{{ product.ured }}</span>
                                                            </div>
                                                        </v-list-item-subtitle>
                                                    </v-list-item>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row class="justify-center align-center w-100 h-100">
                                                    <v-list-item class="w-100">
                                                        <v-list-item-title class="text-justify mr-5">
                                                            توضیحات محصول
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="pa-3 mt-5 text-center">
                                                            {{ product.pdes }}
                                                        </v-list-item-subtitle>
                                                    </v-list-item>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row class="justify-center align-center w-100 h-100">
                                                    <v-list-item class="w-100">
                                                        <v-list-item-title class="text-justify mr-5">
                                                            قیمت محصول
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="pa-3 mt-5 text-center">
                                                            <span v-if="!product.pdis">{{ product.ppr }}</span>
                                                            <div v-else class="d-flex font-weight-bold">
                                                                <del style="text-decoration-color:red;" class="mx-2">{{
                                                                    product.ppr }}</del>
                                                                <v-icon class="mt-n1 mx-2">mdi-arrow-left-thick</v-icon>
                                                                <ins style="text-decoration:none">{{ product.pdisp }}</ins>
                                                            </div>
                                                        </v-list-item-subtitle>
                                                    </v-list-item>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row class="align-center w-100 h-100 justify-space-between">
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-row>
                                                            <v-btn class="rounded-lg mx-1 d-inline-flex"
                                                                @click="numberOfProductToBuy[index]++"
                                                                style="width:50px;height:50px;">
                                                                <v-icon>mdi-plus-box</v-icon>
                                                            </v-btn>
                                                            <v-text-field variant="outlined"
                                                                style="width:50px;height:40px;margin-top:-5px"
                                                                v-model="numberOfProductToBuy[index]"></v-text-field>
                                                            <v-btn class="rounded-lg mx-1 d-inline-flex"
                                                                @click="numberOfProductToBuy[index]--; if (numberOfProductToBuy[index] < 0) { numberOfProductToBuy[index] = 0 }"
                                                                style="width:50px;height:50px;">
                                                                <v-icon>mdi-minus-box</v-icon>
                                                            </v-btn>
                                                        </v-row>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" class="mt-3 mt-sm-0">
                                                        <v-card-subtitle v-if="!product.pext">کالای مورد نظر دیگر وجود
                                                            ندارد</v-card-subtitle>
                                                        <v-btn block class="bg-red font-weight-bold"
                                                            :disabled="!product.pext"
                                                            @click="payProduct1(product.firstName, product.profileImage, product.pid, product.tid, numberOfProductToBuy[index], product.pim, product.pn, product.ppr)">پرداخت</v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-divider class="text-red bg-red w-75 my-3"></v-divider>
                            </v-card>
                        </v-row>
                    </v-window-item>
                    <v-window-item value="boughts" class="mt-4">
                        <v-row dense>
                            <v-card class="w-100 my-2 elevation-0"
                                v-for="(product, index) in   [...buyedProductsByZarrin, ...buyedProductsByBankGateway, ...buyedProductsByAdmin]  "
                                :key="index">
                                <v-row dense>
                                    <v-col cols="4">
                                        <div class="align-center d-flex flex-column justify-center">
                                            <div style="width:1px;height:50px"></div>
                                            <v-img style="min-width: 100px;" class="rounded-lg elevation-3 d-flex"
                                                :src="product.pim && product.pim.length > 0 ? `${baseUrl}${product.pim}` : `${unKnownProduct ? '../../src/client/cassets/images/unKnownProduct.png' : 'cassets/images/unKnownProduct.png'}`">
                                            </v-img>
                                        </div>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-row class="w-100 h-100 align-center justify-center">
                                            <v-col cols="12">
                                                <v-row class="justify-center align-center w-100 h-100">
                                                    <v-list-item class="w-100 mt-2">
                                                        <v-list-item-title class="text-justify mr-5">
                                                            نام محصول
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="pa-3 text-center mt-5">
                                                            <div class="d-flex flex-column">
                                                                <span>{{ product.pn }}</span>
                                                                <span class="mx-3">تاریخ ثبت خرید</span> <span>{{
                                                                    product.ubud }}</span>
                                                            </div>
                                                        </v-list-item-subtitle>
                                                    </v-list-item>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row class="justify-center align-center w-100 h-100">
                                                    <v-list-item class="w-100">
                                                        <v-list-item-title class="text-justify mr-5">
                                                            توضیحات محصول
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="pa-3 mt-5 text-center">
                                                            {{ product.pdes }}
                                                        </v-list-item-subtitle>
                                                    </v-list-item>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row class="justify-center align-center w-100 h-100">
                                                    <v-list-item class="w-100">
                                                        <v-list-item-title class="text-justify mr-5">
                                                            قیمت محصول
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="pa-3 mt-5 text-center">
                                                            <span>{{ product.tamo }}</span>

                                                        </v-list-item-subtitle>
                                                    </v-list-item>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row class="align-center w-100 h-100 justify-space-between">
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-row>
                                                            <span class="mx-2">تعداد</span>
                                                            <v-text-field variant="outlined" disabled
                                                                style="width:50px;height:40px;margin-top:-5px"
                                                                :value="product.tnum"></v-text-field>
                                                        </v-row>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" class="mt-3 mt-sm-0">
                                                        <v-alert
                                                            :color="product.buyMethod == 10 ? 'green-lighten-4' : product.buyMethod == 11 ? 'green-darken-1' : product.buyMethod == 12 ? 'green-lighten-2' :
                                                                product.buyMethod == 13 ? 'green-darken-4' : product.buyMethod == 14 ? 'green-darken-3' :
                                                                    product.buyMethod == 20 ? 'blue-grey-lighten-3' : product.buyMethod == 21 ? 'blue-grey-darken-1' : product.buyMethod == 22 ? 'blue-grey-lighten-1' : product.buyMethod == 23 ? 'blue-grey-darken-4' : product.buyMethod == 24 ? 'blue-grey-darken-3' :
                                                                        product.buyMethod == 30 ? 'brown-darken-1' : product.buyMethod == 31 ? 'brown-darken-3' :
                                                                            product.buyMethod == 40 ? 'deep-orange-lighten-3' : product.buyMethod == 42 ? 'deep-orange-lighten-2' : product.buyMethod == 43 ? 'deep-orange-lighten-1' :
                                                                                product.buyMethod == 44 ? 'deep-orange-darken-2' : product.buyMethod == 45 ? 'deep-orange-darken-3' :
                                                                                    product.buyMethod == 46 ? 'deep-orange-darken-4' : ''"
                                                            :text="product.buyMethod == 10 ? ' درگاه زرین پال-عدم پاسخی از طریق درگاه-  منتظر نظر ادمین'
                                                                : product.buyMethod == 11 ? 'خرید از درگاه زرین پال-پرداخت موفق وجه از درگاه- منتظر نظر ادمین'
                                                                    : product.buyMethod == 12 ? 'خرید از درگاه زرین پال-عدم پرداخت موفق وجه از درگاه -منتظر تصمیم ادمین'
                                                                        : product.buyMethod == 13 ? 'خرید از درگاه زرین پال- پرداخت موفق وجه از درگاه -تایید شده توسط ادمین'
                                                                            : product.buyMethod == 14 ? 'خرید از درگاه زرین پال-عدم پرداخت موفق وجه از درگاه -تایید شده توسط ادمین'

                                                                                : product.buyMethod == 20 ? ' خرید از درگاه بانکی-عدم پاسخی از طریق درگاه-  منتظر نظر ادمین'
                                                                                    : product.buyMethod == 21 ? 'خرید از درگاه بانکی-پرداخت موفق وجه از درگاه- منتظر نظر ادمین'
                                                                                        : product.buyMethod == 22 ? 'خرید از درگاه  بانکی-عدم پرداخت موفق وجه از درگاه -منتظر تصمیم ادمین'
                                                                                            : product.buyMethod == 23 ? 'خرید از درگاه بانکی- پرداخت موفق وجه از درگاه -تایید شده توسط ادمین'
                                                                                                : product.buyMethod == 24 ? 'خرید از درگاه بانکی-عدم پرداخت موفق وجه از درگاه -تایید شده توسط ادمین'

                                                                                                    : product.buyMethod == 30 ? 'خرید توسط ارتباط مستقیم با ادمین- منتظر نظر ادمین'
                                                                                                        : product.buyMethod == 31 ? 'خرید از ارتباط مستقیم با ادمین-تایید شده توسط ادمین'

                                                                                                            : product.buyMethod == 40 ? ' کنسل شده توسط کاربر'
                                                                                                                : product.buyMethod == 41 ? 'کنسل شده به دلیل تمام شدن وقت رزرو کالا'
                                                                                                                    : product.buyMethod == 42 ? 'خرید از زرین پال- تراکنش موفق در زرین پال- رد شده توسط ادمین'
                                                                                                                        : product.buyMethod == 43 ? 'خرید از زرین پال- تراکنش ناموفق در زرین پال- رد شده توسط ادمین'
                                                                                                                            : product.buyMethod == 44 ? 'خرید از درگاه بانکی- تراکنش موفق در درگاه بانکب- رد شده توسط ادمین'
                                                                                                                                : product.buyMethod == 45 ? 'خرید از درگاه بانکی - تراکنش ناموفق در درگاه رد شده توسط ادمین'
                                                                                                                                    : product.buyMethod == 46 ? 'خرید توسط ارتباط مستقیم با ادمین- رد شده توسط ادمین'
                                                                                                                                        : ''
                                                                "></v-alert>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-divider class="text-red bg-red w-75 my-3"></v-divider>
                            </v-card>
                        </v-row>
                    </v-window-item>
                    <v-window-item value="cancels" class="mt-4">
                        <v-row dense>
                            <v-card class="w-100 my-2 elevation-0" v-for="(  product, index  ) in   cancelProductsByUser  "
                                :key="index">
                                <v-row dense>
                                    <v-col cols="4">
                                        <div class="align-center d-flex flex-column justify-center">
                                            <div style="width:1px;height:50px"></div>
                                            <v-img style="min-width: 100px;" class="rounded-lg elevation-3 d-flex"
                                                :src="product.pim && product.pim.length > 0 ? `${baseUrl}${product.pim}` : `${processDev ? '../../src/client/cassets/images/unKnownProduct.png' : 'cassets/images/unKnownProduct.png'}`">
                                            </v-img>
                                        </div>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-row class="w-100 h-100 align-center justify-center">
                                            <v-col cols="12">
                                                <v-row class="justify-center align-center w-100 h-100">
                                                    <v-list-item class="w-100 mt-2">
                                                        <v-list-item-title class="text-justify mr-5">
                                                            نام محصول
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="pa-3 text-center mt-5">
                                                            <div class="d-flex flex-column">
                                                                <span>{{ product.pn }}</span>
                                                                <span class="mx-3">تاریخ ثبت خرید</span><span>{{
                                                                    product.ured }}</span>
                                                            </div>
                                                        </v-list-item-subtitle>
                                                    </v-list-item>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row class="justify-center align-center w-100 h-100">
                                                    <v-list-item class="w-100">
                                                        <v-list-item-title class="text-justify mr-5">
                                                            توضیحات محصول
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="pa-3 mt-5 text-center">
                                                            {{ product.pdes }}
                                                        </v-list-item-subtitle>
                                                    </v-list-item>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row class="justify-center align-center w-100 h-100">
                                                    <v-list-item class="w-100">
                                                        <v-list-item-title class="text-justify mr-5">
                                                            قیمت محصول
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle class="pa-3 mt-5 text-center">
                                                            <span>{{ product.tamo }}</span>

                                                        </v-list-item-subtitle>
                                                    </v-list-item>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-row class="align-center w-100 h-100 justify-space-between">
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-row>
                                                            <span class="mx-2">تعداد</span>
                                                            <v-text-field variant="outlined" disabled
                                                                style="width:50px;height:40px;margin-top:-5px"
                                                                :value="product.tnum"></v-text-field>
                                                        </v-row>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" class="mt-3 mt-sm-0">
                                                        <v-card-text>
                                                            <v-alert class="text-subtitle" title="تاریخ کنسل کردن"
                                                                :text="product.ures"></v-alert>
                                                        </v-card-text>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-divider class="text-red bg-red w-75 my-3"></v-divider>
                            </v-card>
                        </v-row>
                    </v-window-item>
                </v-window>
            </v-col>
        </v-row>
    </v-locale-provider>
</template>
<script>
import { baseURL, PostData_normal } from "@/services/remotedatamodify"
import { useMainStore } from "@/store/main";
export default {
    data() {
        return {
            gettingProducts: true,
            baseUrl: baseURL,
            products: [],
            reserverdProducts: [],
            buyedProductsByZarrin: [],
            buyedProductsByBankGateway: [],
            buyedProductsByAdmin: [],
            numberOfProductToBuy: [],
            cancelProductsByUser: [],
            paydialog: false,
            tab: "reservs",
            product: { fName: "", im: "", pid: "", tid: "", pnums: 0, ppim: "", pn: "", pprice: "" },
            useMainStore: useMainStore,
            payChoicesDialog: false,
            elementThatIsPaying: {},
            processDev: process.env.dev
        }
    },
    computed: {
        aph() {
            return useMainStore().aph
        }
    },
    created() {
        this.getPortfilo();
        console.log(this.$route.fullPath)
    },
    methods: {
        removePRoductFromReserve(tid, peri) {
            PostData_normal("user/rt", { tid: tid, peri: peri }, {
                onUploadProgress: (ProgressEvent) => {
                    useMainStore().mpv = Math.round(ProgressEvent.loaded * 100 / ProgressEvent.total);
                }
            }, (err, res) => {
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
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. دوباره تلاش کنید" }
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
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات به روزرسانی شدند." }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                        this.products = res.data.info;
                        //console.log(this.products)
                        useMainStore().u.rep = res.data.numOfReservs;
                        let reservs = this.products.filter((item, index) => {
                            return item.ts == 1
                        })
                        this.reserverdProducts = reservs;
                        //console.log(this.reserverdProducts)
                        let boughtsByZarrin = this.products.filter((item, index) => {
                            return item.ts == 4 || item.ts == 41 || item.ts == 42 ||
                                item.ts == 411 || item.ts == 421
                        })
                        boughtsByZarrin.forEach(element => {
                            element.ts == 4 ? element["buyMethod"] = 10 :
                                element.ts == 41 ? element["buyMethod"] = 11 :
                                    element.ts == 42 ? element["buyMethod"] = 12 :
                                        element.ts == 411 ? element["buyMethod"] = 13 :
                                            element.ts == 421 ? element["buyMethod"] = 14 :
                                                element["buyMethod"] = -10;
                        });
                        this.buyedProductsByZarrin = boughtsByZarrin;
                        let boughtsByBank = this.products.filter((item, index) => {
                            return item.ts == 5 || item.ts == 51 || item.ts == 52 ||
                                item.ts == 511 || item.ts == 521
                        })
                        boughtsByBank.forEach(element => {
                            element.ts == 5 ? element["buyMethod"] = 20 :
                                element.ts == 51 ? element["buyMethod"] = 21 :
                                    element.ts == 52 ? element["buyMethod"] = 22 :
                                        element.ts == 511 ? element["buyMethod"] = 23 :
                                            element.ts == 521 ? element["buyMethod"] = 24 :
                                                element["buyMethod"] = -20;
                        });
                        this.buyedProductsByBankGateway = boughtsByBank;
                        let boughtsByAdmin = this.products.filter((item, index) => {
                            return item.ts == 6 || item.ts == 61;
                        })
                        boughtsByAdmin.forEach(element => {
                            element.ts == 6 ? element["buyMethod"] = 30 : element.ts == 61 ? element["buyMethod"] = 31 :
                                element["buyMethod"] = -30;
                        });
                        this.buyedProductsByAdmin = boughtsByAdmin;
                        let cancelsByUser = this.products.filter((item, index) => {
                            return item.ts == 2 || item.ts == 3 || item.ts == 412 || item.ts == 422 || item.ts == 512 ||
                                item.ts == 522 || item.ts == 62
                        })
                        cancelsByUser.forEach(element => {
                            element.ts == 2 ? element["buyMethod"] = 40 : element.ts == 3 ? element["buyMethod"] = 41
                                : element.ts == 412 ? element["buyMethod"] = 42 : element.ts == 422 ? element["buyMethod"] = 43
                                    : element.ts == 512 ? element["buyMethod"] = 44 : element.ts == 522 ? element["buyMethod"] = 45
                                        : element.ts == 62 ? element["buyMethod"] = 46 : element["buyMethod"] = -30;
                        });
                        this.cancelProductsByUser = cancelsByUser;
                        // console.log(this.products);
                        // console.log(this.cancelProductsByUser)
                        this.cancelProductsByUser = cancelsByUser;
                        this.products.forEach((item, index) => {
                            this.numberOfProductToBuy.push(1)
                        })
                    }
                    else if (res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                        }, 2000);
                    }
                }

            })
        },
        payProduct1(pfn, pim, pid, tid, pnums, ppim, pn, pprice) {
            this.payChoicesDialog = true;
            this.elementThatIsPaying = { pfn: pfn, pim: pim, pid: pid, tid: tid, pnums: pnums, ppim: ppim, pn: pn, pprice: pprice }
        },
        zarrinPal() {
            this.payChoicesDialog = false;
            useMainStore().mps = true;
            PostData_normal("/user/zar", {
                pid: this.elementThatIsPaying.pid, pnums: this.elementThatIsPaying.pnums,
                pprice: this.elementThatIsPaying.pprice, tid: this.elementThatIsPaying.tid, route: `${baseURL}/user/zarRes/`
            }, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
                }
            }, (err, res) => {
                // console.log(res)
                // console.log(err)
                useMainStore().mps = false;
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
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. دوباره تلاش کنید" }
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
                    if (res.data.res == "R11") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "در حال انتقال به در گاه پرداخت" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {

                            }
                        }, 2000);
                        window.location.href = `https://www.zarinpal.com/pg/StartPay/${res.data.result}`
                    }
                    else if (res.data.res == "R15") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ذخیره اطلاعات...لطا دوباره تاش کنید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {

                            }
                        }, 2000);
                    }
                    else if (res.data.res == "R51") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ذخیره در ارتباط با درگاه پرداخت...لطفا دوباره تلاش نمایید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {

                            }
                        }, 2000);
                    }
                    else if (res.data.res == "R55") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "خطا در ذخیره در ارتباط با درگاه پرداخت...لطفا دوباره تلاش نمایید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {

                            }
                        }, 2000);
                    }
                    else if (res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                        }, 2000);
                    }
                    else {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. دوباره تلاش کنید" }
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
        },
        payProduct(pfn, pim, pid, tid, pnums, ppim, pn, pprice) {
            this.payChoicesDialog = false;
            useMainStore().mps = true;
            PostData_normal("user/pp", { pi: pid, pnums: pnums, ti: tid }, {
                onUploadProgress: (ProgressEvent) => {
                    useMainStore().mpv = Math.round(100 * ProgressEvent.loaded / ProgressEvent.total)
                }
            }, (err, res) => {
                useMainStore().mps = false;
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
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. دوباره تلاش کنید" }
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
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات به روزرسانی شدند." }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                        this.products = res.data.info;
                        //console.log(this.products)
                        useMainStore().u.rep = res.data.numOfReservs;
                        let reservs = this.products.filter((item, index) => {
                            return item.ts == 1
                        })
                        this.reserverdProducts = reservs;
                        //console.log(this.reserverdProducts)
                        let boughtsByZarrin = this.products.filter((item, index) => {
                            return item.ts == 4 || item.ts == 41 || item.ts == 42 ||
                                item.ts == 411 || item.ts == 421
                        })
                        boughtsByZarrin.forEach(element => {
                            element.ts == 4 ? element["buyMethod"] = 10 :
                                element.ts == 41 ? element["buyMethod"] = 11 :
                                    element.ts == 42 ? element["buyMethod"] = 12 :
                                        element.ts == 411 ? element["buyMethod"] = 13 :
                                            element.ts == 421 ? element["buyMethod"] = 14 :
                                                element["buyMethod"] = -10;
                        });
                        this.buyedProductsByZarrin = boughtsByZarrin;
                        let boughtsByBank = this.products.filter((item, index) => {
                            return item.ts == 5 || item.ts == 51 || item.ts == 52 ||
                                item.ts == 511 || item.ts == 521
                        })
                        boughtsByBank.forEach(element => {
                            element.ts == 5 ? element["buyMethod"] = 20 :
                                element.ts == 51 ? element["buyMethod"] = 21 :
                                    element.ts == 52 ? element["buyMethod"] = 22 :
                                        element.ts == 511 ? element["buyMethod"] = 23 :
                                            element.ts == 521 ? element["buyMethod"] = 24 :
                                                element["buyMethod"] = -20;
                        });
                        this.buyedProductsByBankGateway = boughtsByBank;
                        let boughtsByAdmin = this.products.filter((item, index) => {
                            return item.ts == 6 || item.ts == 61;
                        })
                        boughtsByAdmin.forEach(element => {
                            element.ts == 6 ? element["buyMethod"] = 30 : element.ts == 61 ? element["buyMethod"] = 31 :
                                element["buyMethod"] = -30;
                        });
                        this.buyedProductsByAdmin = boughtsByAdmin;
                        let cancelsByUser = this.products.filter((item, index) => {
                            return item.ts == 2 || item.ts == 3 || item.ts == 412 || item.ts == 422 || item.ts == 512 ||
                                item.ts == 522 || item.ts == 62
                        })
                        cancelsByUser.forEach(element => {
                            element.ts == 2 ? element["buyMethod"] = 40 : element.ts == 3 ? element["buyMethod"] = 41
                                : element.ts == 412 ? element["buyMethod"] = 42 : element.ts == 422 ? element["buyMethod"] = 43
                                    : element.ts == 512 ? element["buyMethod"] = 44 : element.ts == 522 ? element["buyMethod"] = 45
                                        : element.ts == 62 ? element["buyMethod"] = 46 : element["buyMethod"] = -30;
                        });
                        this.cancelProductsByUser = cancelsByUser;
                        this.products.forEach((item, index) => {
                            this.numberOfProductToBuy.push(1)
                        })
                        //console.log(pprice)
                        this.product = { fName: pfn, im: pim, pid: pid, tid: tid, pnums: pnums, ppim: ppim, pn: pn, pprice: pprice };
                        this.paydialog = true;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "error", alT: "توجه", alt: "در حال حاضر سیستم پرداخت غیر فعال می باشد. در خواست شما ثبت شده و از طرف ادمین برای مراحل بعد با شما تماس گرفته خواهد شد." }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 5000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                            // this.paydialog = false;
                        }, 5000);
                    }
                    else if (res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                        }, 2000);
                    }
                }
            })
        },
        getPortfilo() {
            useMainStore().mps = true;
            PostData_normal("user/getPortfilo", {}, {
                onUploadProgress: (ProgressEvent) => {
                    useMainStore().mpv = Math.round(ProgressEvent.loaded * 100 / ProgressEvent.total);
                }
            }, (err, res) => {
                console.log(err)
                this.gettingProducts = false;
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
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "در ارتباط با سرور خطا رخ داده است. دوباره تلاش کنید" }
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
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "اطلاعات به روزرسانی شدند." }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                        this.products = res.data.products;
                        useMainStore().u.rep = res.data.numOfReservs;
                        //console.log(this.products)
                        let reservs = this.products.filter((item, index) => {
                            return item.ts == 1
                        })
                        this.reserverdProducts = reservs;
                        //console.log(this.reserverdProducts)
                        let boughtsByZarrin = this.products.filter((item, index) => {
                            return item.ts == 4 || item.ts == 41 || item.ts == 42 ||
                                item.ts == 411 || item.ts == 421
                        })
                        boughtsByZarrin.forEach(element => {
                            element.ts == 4 ? element["buyMethod"] = 10 :
                                element.ts == 41 ? element["buyMethod"] = 11 :
                                    element.ts == 42 ? element["buyMethod"] = 12 :
                                        element.ts == 411 ? element["buyMethod"] = 13 :
                                            element.ts == 421 ? element["buyMethod"] = 14 :
                                                element["buyMethod"] = -10;
                        });
                        this.buyedProductsByZarrin = boughtsByZarrin;
                        let boughtsByBank = this.products.filter((item, index) => {
                            return item.ts == 5 || item.ts == 51 || item.ts == 52 ||
                                item.ts == 511 || item.ts == 521
                        })
                        boughtsByBank.forEach(element => {
                            element.ts == 5 ? element["buyMethod"] = 20 :
                                element.ts == 51 ? element["buyMethod"] = 21 :
                                    element.ts == 52 ? element["buyMethod"] = 22 :
                                        element.ts == 511 ? element["buyMethod"] = 23 :
                                            element.ts == 521 ? element["buyMethod"] = 24 :
                                                element["buyMethod"] = -20;
                        });
                        this.buyedProductsByBankGateway = boughtsByBank;
                        let boughtsByAdmin = this.products.filter((item, index) => {
                            return item.ts == 6 || item.ts == 61;
                        })
                        boughtsByAdmin.forEach(element => {
                            element.ts == 6 ? element["buyMethod"] = 30 : element.ts == 61 ? element["buyMethod"] = 31 :
                                element["buyMethod"] = -30;
                        });
                        this.buyedProductsByAdmin = boughtsByAdmin;
                        let cancelsByUser = this.products.filter((item, index) => {
                            return item.ts == 2 || item.ts == 3 || item.ts == 412 || item.ts == 422 || item.ts == 512 ||
                                item.ts == 522 || item.ts == 62
                        })
                        cancelsByUser.forEach(element => {
                            element.ts == 2 ? element["buyMethod"] = 40 : element.ts == 3 ? element["buyMethod"] = 41
                                : element.ts == 412 ? element["buyMethod"] = 42 : element.ts == 422 ? element["buyMethod"] = 43
                                    : element.ts == 512 ? element["buyMethod"] = 44 : element.ts == 522 ? element["buyMethod"] = 45
                                        : element.ts == 62 ? element["buyMethod"] = 46 : element["buyMethod"] = -30;
                        });
                        this.cancelProductsByUser = cancelsByUser;
                        // console.log(this.products);
                        // console.log(this.cancelProductsByUser)
                        this.products.forEach((item, index) => {
                            this.numberOfProductToBuy.push(1)
                        })
                    }
                    else if (res.data.res == "R4") {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                        }, 2000);
                    }
                }
            })
        }
    }
}
</script>
<style>
.tableRow>.d-table-cell {
    border: 1px solid black;
    border-spacing: 0px 10px
}
</style>