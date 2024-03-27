<template>
    <div class="d-none d-sm-flex text-black font-weight-bold h-screen overflow-y-hidden">
        <v-img src="@/client/cassets/images/logintemp.png" class="d-flex h-100 align-center w-100" cover>
            <v-container fluid class="h-100 w-100">
                <v-row dense justify="start" class="align-center">
                    <v-col cols="12" sm="6" offset-sm="1" style="max-width:500px;">
                        <v-locale-provider rtl>
                            <v-card elevation="2">
                                <v-window>
                                    <v-window-item>
                                        <v-form @submit.prevent="loginClicked" validate-on="submit">
                                            <template #append>
                                                <v-icon icon="mdi-human-greeting" color="green"></v-icon>
                                            </template>
                                            <v-divider></v-divider>
                                            <v-card-subtitle class="text-center text-red">ورود به سایت</v-card-subtitle>
                                            <v-card-text>
                                                <v-row class="align-center">
                                                    <v-col :cols="loginresult.haveResult ? 12 : 8">
                                                        <v-locale-provider ltr>
                                                            <v-text-field variant="underlined" maxlength="11" class="my-3"
                                                                :rules="[!loginresult.succeeded ? rules.required : rules.code]"
                                                                type="number" v-model="phoneOrCode" color="primary"
                                                                persistent-hint
                                                                :label="!loginresult.succeeded ? 'شماره موبایل' : 'کد ارسال شده'"
                                                                :hint="!loginresult.succeeded ? 'شماره موبایل همراه بدون 0 ابتدای آن' : 'کد ارسال شده را وارد نمایید'"
                                                                :placeholder="!loginresult.succeeded ? '912xxxxxxx' : ''">
                                                                <template #prepend>
                                                                    <v-icon color="purple">mdi-phone</v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-locale-provider>
                                                    </v-col>
                                                    <v-col cols="4" v-if="!loginresult.haveResult" id="CountryCodesId">
                                                        <v-locale-provider ltr>
                                                            <v-autocomplete disabled :items="CountryCodes" label="کشور"
                                                                variant="underlined" item-title="name" item-value="code"
                                                                v-model="selectedCountryCode">
                                                                <template v-slot:item="{ props, item }">
                                                                    <v-list-item class="my-2 text-center" v-bind="props"
                                                                        :subtitle="item.raw.code"
                                                                        :title="item.raw.name"></v-list-item>
                                                                </template>
                                                                <template #selection="{ item, index }">
                                                                    <v-list-item>{{ item.raw.code }}</v-list-item>
                                                                </template>
                                                            </v-autocomplete>
                                                        </v-locale-provider>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                            <v-card-subtitle class="d-flex" v-if="loginresult.haveResult">
                                                <v-icon :style="{ color: loginresult.resultError ? 'red' : 'green' }"
                                                    :icon="loginresult.resultError ? 'mdi-emoticon-sad' : 'mdi-emoticon-happy'"></v-icon>
                                                <span :style="{ color: loginresult.resultError ? 'red' : 'green' }">{{
                                                    loginresult.resulttext }}</span>
                                                <v-spacer></v-spacer>
                                                <div v-if="loginresult.resultlogintime">
                                                    <span class="text-green-darken-4 font-weight-bold"
                                                        style="font-size:20px">{{
                                                            loginresult.resultlogintime }}</span>
                                                    <span style="width:15px"></span>
                                                    <span v-if="loginresult.succeeded"
                                                        class="text-green-darken-4 font-weight-bold">ثانیه</span>
                                                    <span style="width:15px"></span>
                                                </div>
                                            </v-card-subtitle>
                                            <v-card-actions>
                                                <v-btn type="submit" :loading="loginLoading" @click="loginClicked"
                                                    variant="elevated" block rounded="sm" size="large"
                                                    class="py-4 text-center bg-red text-black">{{ !loginresult.succeeded ?
                                                        'ورود' : 'ارسال کد' }}</v-btn>
                                            </v-card-actions>
                                        </v-form>
                                    </v-window-item>
                                </v-window>
                            </v-card>
                        </v-locale-provider>
                    </v-col>
                </v-row>
            </v-container>
        </v-img>
    </div>
    <div class="d-flex d-sm-none mt-10 h-screen">
        <v-img src="@/client/cassets/images/logintempmobile.png" class="h-100 align-center" cover>
            <v-container fluid class="h-100 w-100">
                <v-row dense justify="start" class="align-center">
                    <v-col cols="12" sm="6" offset-sm="1" style="max-width:500px;">
                        <v-locale-provider rtl>
                            <v-card elevation="2">
                                <v-window>
                                    <v-window-item>
                                        <v-form @submit.prevent="loginClicked" validate-on="submit">
                                            <template #append>

                                            </template>
                                            <v-divider></v-divider>
                                            <v-card-subtitle class="text-center text-red">ورود به سایت</v-card-subtitle>
                                            <v-card-text>
                                                <v-row class="align-center">
                                                    <v-col :cols="loginresult.haveResult ? 12 : 8">
                                                        <v-locale-provider ltr>
                                                            <v-text-field variant="underlined" maxlength="11" class="my-3"
                                                                :rules="[!loginresult.succeeded ? rules.required : rules.code]"
                                                                type="number" v-model="phoneOrCode" color="primary"
                                                                :label="!loginresult.succeeded ? 'شماره موبایل' : 'کد ارسال شده'"
                                                                :hint="!loginresult.succeeded ? 'شماره موبایل بدون صفر' : 'کد ارسال شده را وارد نمایید'"
                                                                :placeholder="!loginresult.succeeded ? '912xxxxxxx' : ''">
                                                                <template #prepend>
                                                                    <v-icon color="purple">mdi-phone</v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-locale-provider>
                                                    </v-col>
                                                    <v-col cols="4" v-if="!loginresult.haveResult" id="CountryCodesId">
                                                        <v-locale-provider ltr>
                                                            <v-autocomplete disabled v-model="selectedCountryCode"
                                                                :items="CountryCodes" item-title="name" item-value="code"
                                                                label="کشور" variant="underlined">
                                                                <template class="ma-0 pa-0" v-slot:item="{ props, item }">
                                                                    <v-list-item class="my-2 text-center ma-0 pa-0"
                                                                        v-bind="props" :subtitle="item.raw.code"
                                                                        :title="item.raw.name"></v-list-item>
                                                                </template>
                                                                <template #selection="{ item, index }">
                                                                    <v-list-item>{{ item.raw.code }}</v-list-item>
                                                                </template>
                                                            </v-autocomplete>
                                                        </v-locale-provider>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                            <v-card-subtitle class="d-flex" v-if="loginresult.haveResult">
                                                <v-icon :style="{ color: loginresult.resultError ? 'red' : 'green' }"
                                                    :icon="loginresult.resultError ? 'mdi-emoticon-sad' : 'mdi-emoticon-happy'"></v-icon>
                                                <span :style="{ color: loginresult.resultError ? 'red' : 'green' }">{{
                                                    loginresult.resulttext }}</span>
                                                <v-spacer></v-spacer>
                                                <div v-if="loginresult.succeeded">
                                                    <div v-if="loginresult.resultlogintime">
                                                        <span class="text-green-darken-4 font-weight-bold"
                                                            style="font-size:20px">{{ loginresult.resultlogintime }}</span>
                                                        <span style="width:15px"></span>
                                                        <span v-if="loginresult.succeeded"
                                                            class="text-green-darken-4 font-weight-bold">ثانیه</span>
                                                        <span style="width:15px"></span>
                                                    </div>
                                                </div>
                                            </v-card-subtitle>
                                            <v-card-actions>
                                                <v-btn type="submit" :loading="loginLoading" @click="loginClicked"
                                                    variant="elevated" block rounded="sm" size="large"
                                                    class="py-4 text-center bg-red text-black">{{ !loginresult.succeeded ?
                                                        'ورود' : 'ارسال کد' }}</v-btn>
                                            </v-card-actions>
                                        </v-form>
                                    </v-window-item>
                                </v-window>
                            </v-card>
                        </v-locale-provider>
                    </v-col>
                </v-row>
            </v-container>
        </v-img>
    </div>
</template>
<script>
import { PostData_normal } from '../services/remotedatamodify.js'
import { useMainStore } from '@/store/main';
import { phoneCodes } from "@/services/constantprovider"
export default {
    data() {
        return {
            phoneNumber: "",
            codeNumber: "",
            CountryCodes: [],
            selectedCountryCode: "+98",
            loginresult: {
                resulttext: "",
                resultlogintime: false,
                resultError: false,
                haveResult: false,
                succeeded: false
            },
            loginLoading: false,
            rules: {
                required: value => {
                    if (value && value.trim().length > 0) {
                        return true;
                    }
                    else {
                        return "شماره موبایل به درستی وارد نشده است"
                    }
                },
                code: () => {
                    return true;
                }
            }
        }
    },
    created() {
        this.CountryCodes = phoneCodes.map((item, index) => {
            return { "name": item.name, "code": item.dial_code }
        })
        console.log(this.CountryCodes)
    },
    computed: {
        phoneOrCode: {
            get() {
                if (this.loginresult.succeeded) {
                    return this.codeNumber
                }
                else {
                    return this.phoneNumber
                }
            },
            set(val) {
                if (this.loginresult.succeeded) {
                    this.codeNumber = val;
                }
                else {

                    this.phoneNumber = val;
                }
            }
        },
    },
    methods: {
        loginClicked(event) {
            event.stopPropagation();
            event.preventDefault();
            if (!this.loginresult.succeeded) {
                this.checkAndSendPhoneNumber()
            }
            else {
                this.checkLoginCode();
            }
        },
        checkLoginCode() {
            this.loginLoading = true;
            if (this.phoneOrCode.length <= 0) {
                clearInterval(useMainStore().u.gc);
                this.loginresult = {
                    resulttext: "کد ارسال شده را وارد نمایید", resultlogintime: false, resultError: true,
                    haveResult: true, succeeded: true
                }
                this.loginLoading = false;
                useMainStore().u.uln = false;
            }
            else {
                PostData_normal('user/authcode', { code: this.codeNumber }, null, (error, res) => {
                    if (error) {
                        clearInterval(useMainStore().u.gc);
                        useMainStore().u.uc = false;
                        useMainStore().u.uln = false;
                        this.loginresult = {
                            resulttext: "خطا در ارسال اطلاعات. دوباره تلاش کنید", resultlogintime: false, resultError: true,
                            haveResult: true, succeeded: true
                        }
                        this.loginLoading = false;
                    }
                    else {
                        //console.log(res.data);
                        var result = res.data[0];
                        if (result.res == "R4") {
                            useMainStore().u.uc = false;
                            useMainStore().u.uln = false;
                            clearInterval(useMainStore().u.gc);
                            this.loginresult = {
                                resulttext: "مشکل در تایید هویت. لطفا دوباره وارد شوید",
                                resultlogintime: false, resultError: true,
                                haveResult: true, succeeded: true
                            }
                            this.loginLoading = true;
                            setTimeout(() => {
                                this.loginresult.succeeded = false;
                                this.loginresult.haveResult = false
                                this.loginLoading = false;
                            }, 2000);
                        }
                        else if (result.res == "R5") {
                            clearInterval(useMainStore().u.gc);
                            useMainStore().u.uc = false;
                            useMainStore().u.uln = false;
                            this.loginresult = {
                                resulttext: "حطا در دریافت اطلاعات",
                                resultlogintime: false, resultError: true,
                                haveResult: true, succeeded: true
                            }
                            this.loginLoading = true;
                            setTimeout(() => {
                                this.loginresult.succeeded = false;
                                this.loginresult.haveResult = false
                                this.loginLoading = false;
                            }, 2000);
                        }
                        else if (result.res == "R6") {
                            useMainStore().u.uc = false;
                            useMainStore().u.uln = false;
                            clearInterval(useMainStore().u.gc);
                            this.loginresult = {
                                resulttext: "کد مورد نظر منقضی شده است",
                                resultlogintime: false, resultError: true,
                                haveResult: true, succeeded: true
                            }
                            this.loginLoading = true;
                            setTimeout(() => {
                                this.loginresult.succeeded = false;
                                this.loginresult.haveResult = false
                                this.loginLoading = false;
                            }, 2000);
                        }
                        else if (result.res == "R7") {
                            useMainStore().u.uc = false;
                            useMainStore().u.uln = false;
                            this.loginresult = {
                                resulttext: "کد وارد شده اشتباه هست",
                                resultlogintime: true, resultError: true,
                                haveResult: true, succeeded: true
                            }
                            this.loginLoading = false;
                        }
                        else if (result.res == "update2") {
                            clearInterval(useMainStore().u.gc);
                            useMainStore().u.uln = true;
                            if (res.data[1] && (res.data[1]).length > 0) {
                                let userInfo = (res.data[1])[0];
                                useMainStore().u.upn = userInfo.up.upn;
                                useMainStore().u.upln = userInfo.up.upln;
                                useMainStore().u.upi = userInfo.up.upi;
                                useMainStore().u.rep = userInfo.rep;
                                useMainStore().u.bup = userInfo.bup;
                                useMainStore().u.uc = userInfo.uc;
                                useMainStore().u.mr = userInfo.mr;
                                useMainStore().u.mu = userInfo.mu;
                            }
                            this.loginresult = {
                                resulttext: "تبریک...خوش آمدید.", resultlogintime: false, resultError: false,
                                haveResult: true, succeeded: true
                            }
                            this.loginLoading = true;
                            setTimeout(() => {
                                useMainStore().wd = true;
                                this.loginLoading = false;
                                this.$router.replace("/");
                            }, 1000);
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
                                useMainStore().u.rep = userInfo.rep;
                                useMainStore().u.bup = userInfo.bup;
                                useMainStore().u.uc = userInfo.uc;
                                useMainStore().u.mr = userInfo.mr;
                                useMainStore().u.mu = userInfo.mu;
                            }
                            this.loginresult = {
                                resulttext: "تبریک...خوش آمدید.", resultlogintime: false, resultError: false,
                                haveResult: true, succeeded: true
                            }
                            this.loginLoading = true;
                            setTimeout(() => {
                                useMainStore().wd = true;
                                this.loginLoading = false;
                                this.$router.replace("/");
                            }, 1000);
                        }
                        else if (result.res == "update0") {
                            clearInterval(useMainStore().u.gc);
                            useMainStore().u.uln = true;
                            if (res.data[1] && (res.data[1]).length > 0) {
                                let userInfo = (res.data[1])[0];
                                useMainStore().u.upn = userInfo.up.upn;
                                useMainStore().u.upln = userInfo.up.upln;
                                useMainStore().u.upi = userInfo.up.upi;
                                useMainStore().u.rep = userInfo.rep;
                                useMainStore().u.bup = userInfo.bup;
                                useMainStore().u.uc = userInfo.uc;
                                useMainStore().u.mr = userInfo.mr;
                                useMainStore().u.mu = userInfo.mu;
                            }
                            this.loginresult = {
                                resulttext: "تبریک...خوش آمدید.", resultlogintime: false, resultError: false,
                                haveResult: true, succeeded: true
                            }
                            this.loginLoading = true;
                            setTimeout(() => {
                                useMainStore().wd = true;
                                this.loginLoading = false;
                                this.$router.replace("/");
                            }, 1000);

                        }
                        else if (result.res == "blocked") {
                            clearInterval(useMainStore().u.gc);
                            useMainStore().u.uln = "blocked";
                            useMainStore().u.uc = false;
                            this.loginresult = {
                                resulttext: "شما امکان استفاده کامل از سیستم را ندارید. لطفا با ما تماس بگیرید",
                                resultlogintime: false, resultError: true,
                                haveResult: true, succeeded: true
                            }
                            this.loginLoading = false;
                        }
                        else {
                            clearInterval(useMainStore().u.gc);
                            this.loginresult = {
                                resulttext: "خطا در ارتباط با سرور",
                                resultlogintime: false, resultError: true,
                                haveResult: true, succeeded: true
                            }
                            this.loginLoading = false;
                        }
                    }
                })
            }
        },
        checkAndSendPhoneNumber() {
            this.loginresult.haveResult = false
            this.loginLoading = true;
            console.log(this.selectedCountryCode)
            // if (this.phoneOrCode.length <= 0) {
            //     clearInterval(useMainStore().u.gc);
            //     this.loginresult = {
            //         resulttext: "شماره موبایل را وارد نمایید",
            //         resultlogintime: false, resultError: true,
            //         haveResult: true, succeeded: false
            //     }
            //     this.loginLoading = false;
            // }
            // else {
            console.log(this.selectedCountryCode)
            PostData_normal('user/verifytel', { phone: `${this.selectedCountryCode}${this.phoneNumber}`, type: this.tab ? this.tab : "0" }, null, (error, res) => {
                if (error) {
                    clearInterval(useMainStore().u.gc);
                    this.loginresult = {
                        resulttext: "در ارسال اطلاعات خطایی رخ داد. دوباره تلاش کنید",
                        resultlogintime: false, resultError: true,
                        haveResult: true, succeeded: false
                    }
                    this.loginLoading = false;
                }
                else {
                    this.loginLoading = false;
                    var result = res.data.result;
                    var time = res.data.time;
                    //console.log(result);
                    if (result == "R1") {
                        this.loginresult = {
                            resulttext: "کد ارسال شده را وارد نمایید",
                            resultlogintime: time, resultError: false,
                            haveResult: true, succeeded: true
                        }
                        this.startLoginCodeCounting(time)
                    }
                    else {
                        clearInterval(useMainStore().u.gc);
                        this.loginresult = {
                            resulttext: "در ارسال کد حطایی رخ داد. دوباره تلاش کنید",
                            resultlogintime: false, resultError: true,
                            haveResult: true, succeeded: false
                        }
                        this.loginLoading = false;
                    }
                }
            })
            // }
        },
        startLoginCodeCounting(time) {
            useMainStore().u.gc = setInterval(() => {
                time--;
                this.loginresult.resultlogintime = time;
                if (time <= 0) {
                    clearInterval(useMainStore().u.gc);
                    this.loginresult = {
                        resulttext: "زمان برای وارد کردن کد به اتمام رسید",
                        resultlogintime: false, resultError: true,
                        haveResult: true, succeeded: true
                    }
                    this.loginLoading = true;
                    setTimeout(() => {
                        this.loginresult.succeeded = false;
                        this.loginresult.haveResult = false
                        this.loginLoading = false;
                    }, 2000);
                }
            }, 1000);
        },
    }
}
</script>
<style>
@media screen and (max-width:400px) {
    #CountryCodesId .v-list-item {
        font-size: 10px;
    }
}

#CountryCodesId .v-list-item {
    margin: 0px;
    padding: 0px;
}
</style>