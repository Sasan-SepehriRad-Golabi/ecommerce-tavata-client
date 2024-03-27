<template>
    <v-locale-provider rtl>
        <v-row dense style="flex: none !important;display: flex;"
            class="my-3 justify-center align-center w-100 bg-gray-lighten-3">
            <v-col cols="12">
                <v-card :loading="filterLoading" elevation="0">
                    <v-slide-group v-if="filterLoading" class="mt-2">
                        <v-slide-group-item>
                            <v-skeleton-loader class="mx-auto" elevation="2" type="button"
                                style="min-width:120px;display:flex;justify-content:center">

                            </v-skeleton-loader>
                        </v-slide-group-item>
                        <v-slide-group-item>
                            <v-skeleton-loader class="mx-auto" elevation="2" type="button"
                                style="min-width:120px;display:flex;justify-content:center">

                            </v-skeleton-loader>
                        </v-slide-group-item>
                        <v-slide-group-item>
                            <v-skeleton-loader class="mx-auto" elevation="2" type="button"
                                style="min-width:120px;display:flex;justify-content:center">

                            </v-skeleton-loader>
                        </v-slide-group-item>
                        <v-slide-group-item>
                            <v-skeleton-loader class="mx-auto" elevation="2" type="button"
                                style="min-width:120px;display:flex;justify-content:center">

                            </v-skeleton-loader>
                        </v-slide-group-item>

                    </v-slide-group>
                    <v-slide-group v-else id="slide-group" show-arrows center-active>
                        <v-slide-group-item v-for="(filter, index) in filters" :key="index" value="specialOffers">
                            <v-btn @click="getOffers(filter.filterCategoryId)"
                                :class="['rounded-0', 'my-3', 'mx-2', 'rounded-lg', filter.filterCategoryId == defaultSelectedFilter ? 'elevation-5' : 'elevation-0']"
                                :style="{ 'min-height': '60px', 'background-color': filter.filterCategoryId == defaultSelectedFilter ? 'green' : 'white' }">
                                <v-avatar style="border:2px solid red;">
                                    <v-img :src="`${baseUrl}${filter.iconUrl}`">
                                    </v-img>
                                </v-avatar>
                                <span end>{{ filter.filterName }}</span>
                            </v-btn>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-card>
            </v-col>
        </v-row>
        <v-divider class="bg-red-darken-3 my-1 my-sm-3"></v-divider>
        <v-row dense class="align-center px-2">
            <v-col cols="12">
                <v-card :loading="shortVersionLoading"
                    :class="['w-100', 'my-1', 'pa-3', 'd-flex', 'justify-start', this.$vuetify.display.name != 'xs' ? 'pb-10' : 'pb-3']"
                    elevation="1">
                    <v-col>
                        <v-row dense>
                            <v-col cols="12">
                                <v-btn variant="text" style="position: relative;"
                                    @click="modifyMemmbersOfFilter(defaultSelectedFilter)"
                                    class="ml-n4 bg-red d-inline-flex align-center float-left rounded-xl ">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                    <span style="margin-top: -5px;">بیشتر</span>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <FilterShortVersionsPlacement :filtersShortMembers="filtersShortMembers"
                                    :defaultSelectedFilter="defaultSelectedFilter" />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
        <v-divider class="bg-red-darken-3 my-1 my-sm-3"></v-divider>
    </v-locale-provider>
</template>
<script>
import FilterShortVersionsPlacement from './FilterShortVersionsPlacement.vue'
import { PostData_normal, baseURL } from '@/services/remotedatamodify'
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {
            mdAndUp: false,
            mdAndDown: false,
            defaultSelectedFilter: "",
            shortVersionLoading: true,
            filterIconUrls: [],
            filterIconIds: [],
            iconsUploading: false,
            iconsApplying: false,
            uploadIconInput: "",
            selectedFilterName: "",
            selectedIconId: "",
            selectedIconUrl: "",
            baseUrl: baseURL,
            isSelectedImagesIsLoaded: false,
            filters: [],
            filtersShortMembers: [],
            filterLoading: true,
            modifyFilterContentsMainContent: false,
            selectedFilterId: "",
            activeFilterCategory: -1
        }
    },
    components: {
        FilterShortVersionsPlacement
    },
    computed: {
        displayName() {
            return this.$vuetify.display.name
        },
        pageHeight() {
            return this.$vuetify.display.height;
        },
        createFilterElementsCardMaxHeight() {
            if (document.body.clientHeight < 450) {
                return document.body.clientHeight - 50

            }
            else {
                return 2 * (document.body.clientHeight / 2 - 50);
            }
        }
    },
    created() {
        let newval = this.displayName
        switch (newval) {
            case 'xs':
                this.mdAndDown = true;
                this.mdAndUp = false;
                break;
            case 'sm':
            case 'md':
            case 'lg':
            case "xl":
            case 'xxl':
                this.mdAndUp = true;
                this.mdAndDown = false;

        }
        //console.log("kkkkkkkkkkkk")
        //console.log(this.filterMemberImagePrev)
        //console.log("gggggggggggggggggg")
        this.getFilterIconUrls();
        this.getFilters();
        this.getFilterShortMembers();
    },
    watch: {
        pageHeight(newVal) {
            //console.log(newVal)
            if (document.body.clientHeight < 450) {
                return document.body.clientHeight - 50

            }
            else {
                let x = document.body.clientHeight / 2;
                //console.log(x)
                return 2 * (x - 50);
            }
        },
        filterMemberImage(newval) {
            //console.log(newval)
            if (newval.length > 0) {
                let image = this.filterMemberImage[0];
                this.filterMemberImagePrev = URL.createObjectURL(image);
            }
        },
        displayName(newval) {
            //console.log(newval)
            switch (newval) {
                case 'xs':
                    this.mdAndDown = true;
                    this.mdAndUp = false;
                    break;
                case 'sm':
                case 'md':
                case 'lg':
                case "xl":
                case 'xxl':
                    this.mdAndUp = true;
                    this.mdAndDown = false;

            }
        }
    },
    methods: {
        getFilterShortMembers() {
            useMainStore().mps = true;
            useMainStore().mpv = 0;
            PostData_normal("/user/gsfm", {}, {
                onUploadProgress: (progressEvent) => {
                    useMainStore().mpv = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            }, (err, res) => {
                useMainStore().mpv = 0;
                useMainStore().mps = false
                this.shortVersionLoading = false;
                if (err) {

                }
                else {
                    if (res.data.res && res.data.res == "R1") {
                        this.filtersShortMembers = res.data.fm
                        //console.log(this.filtersShortMembers)
                    }
                }
            })
        },
        showMembers(filterId) {
            this.activeFilterCategory = filterID;
        },
        getFilters() {
            PostData_normal("user/filters", {}, null, (err, res) => {
                this.filterLoading = false;
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
                    if (res.data && res.data.res == "R5") {
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
                    else if (res.data && res.data.res == "R6") {
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "فیلتر پیدا نشد" }
                        useMainStore().sn.sn = true;
                        useMainStore().sn.snt = 2000
                        setTimeout(() => {
                            useMainStore().mpv = 0;
                            if (!useMainStore().gtlis) {
                                useMainStore().sn.sn = false;
                            }
                        }, 2000);
                    }
                    else if (res.data && res.data.res == "R1") {
                        let filters = res.data.filters;
                        this.filters = filters;
                        for (let i = 0; i < this.filters.length; i++) {
                            if (this.filters[i].isDefault) {
                                this.defaultSelectedFilter = this.filters[i].filterCategoryId;
                                break;
                            }
                        }
                        useMainStore().mpv = 0;
                        this.iconsApplying = false;
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "success", alT: "توجه", alt: "فیلترها با موفقیت آپدیت شدند" }
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
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "شما به درستی شناسایی نشدید. لطفا دوباره وارد شوید" }
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
        getFilterIconUrls() {
            PostData_normal("user/icons", {}, null, (err, res) => {
                if (err) {
                    useMainStore().mps = false;
                    useMainStore().mol = false;
                    useMainStore().al = { alC: "warning", alT: "توجه", alt: "در دانلود آیکون ها خطایی رخ داده است." }
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
                    if (res.data && res.data.length > 0) {
                        if (res.data && res.data[0] && res.data[0].res == "ok") {
                            this.filterIconUrls = res.data[1].map((icon) => {
                                return icon.iv;
                            })
                            this.filterIconIds = res.data[1].map((icon) => {
                                return icon.in;
                            })
                            //console.log(this.filterIconUrls);
                            useMainStore().mps = false;
                            useMainStore().mol = false;
                            useMainStore().al = { alC: "success", alT: "توجه", alt: "آیکون ها با موفقیت دانلود شدند" }
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
                            useMainStore().al = { alC: "warning", alT: "توجه", alt: "آیکون ها به درستی دانلود نشدند" }
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
                    else {
                        useMainStore().mps = false;
                        useMainStore().mol = false;
                        useMainStore().al = { alC: "warning", alT: "توجه", alt: "آیکون ها به درستی دانلود نشدند" }
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
        getOffers(filterCategoryId) {
            //console.log(filterCategoryId)
            this.defaultSelectedFilter = filterCategoryId;
            this.selectedFilterId = filterCategoryId;
        },
        modifyMemmbersOfFilter(selectedFilterId) {
            //console.log(selectedFilterId)
            this.$router.replace(`/filtermembers/${this.defaultSelectedFilter}`)
        },

    }
}
</script>
<style>
#slide-group button {
    padding: 25px;
    display: flex;
    font-size: 15px;
}

@media screen and (min-width:600px) {
    .selectionbtn {
        font-weight: bold !important;
    }
}




.selectionbtn1 {
    background-color: red !important;
}
</style>