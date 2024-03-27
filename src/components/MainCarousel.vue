<template>
    <v-row dense style="flex: none !important;position: relative;" class="align-center justify-center">
        <v-col cols="12">
            <v-locale-provider rtl>
                <v-carousel id="mainCarousel" cycle :style="{ 'margin-top': aph + 'px', 'height': imageHeight + 'px' }">
                    <div v-if="images && images.length > 0">
                        <v-carousel-item v-for="(  image, index  ) in   images  " :key="index" class="mainCarouselItem">
                            <v-img gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                :style="{ 'height': imageHeight + 'px', 'filter': `blur(${blurAmount[index]}px)`, 'object-fit': 'cover' }"
                                :src="`${baseUrl}${image.imageUrl}`">
                            </v-img>
                            <v-row class="ma-0 justify-center align-center w-100 h-100 carsoule-image-card">
                                <v-col cols="8" md="5">
                                    <v-card :style="{
                                        'position': 'absolute', 'top': 100 * middleMainBox[index].positionY + '%', 'left': 100 * middleMainBox[index].positionX + '%',
                                        'width': 100 * middleMainBox[index].width + '%', 'height': 100 * middleMainBox[index].height + '%',
                                        'background-color': `rgba(0,0,0,${middleMainBox[index].opacity})`, 'border-radius': `${middleMainBox[index].borderRadius}px`
                                    }">
                                        <v-card-subtitle draggable="true" class="text-justify" :style="{
                                            'line-height': 'unset', 'width': '100%',
                                            'position': 'absolute',
                                            'white-space': 'normal', color: middleHint1[index].color, 'opacity': 'unset',
                                            'font-size': middleHint1[index].fontSize + 'px',
                                            'top': 100 * middleHint1[index].positionY + '%',
                                            'left': -100 * middleHint1[index].positionX + '%', 'padding': '0px'
                                        }">
                                            {{ middleHint1[index] && middleHint1[index].text &&
                                                middleHint1[index].text.trim().length > 0 ? middleHint1[index].text :
                                                '' }}
                                        </v-card-subtitle>
                                        <v-card-subtitle draggable="true" class="text-justify" :style="{
                                            'position': 'absolute', 'width': '100%',
                                            'white-space': 'normal', color: middleHint2[index].color, 'opacity': 'unset',
                                            'font-size': middleHint2[index].fontSize + 'px',
                                            'top': 100 * middleHint2[index].positionY + '%',
                                            'left': -100 * middleHint2[index].positionX + '%', 'padding': '0px'
                                        }">{{
    middleHint2[index] &&
    middleHint2[index].text && middleHint2[index].text.trim().length > 0 ?
    middleHint2[index].text :
    '' }}</v-card-subtitle>
                                        <v-card-subtitle draggable="true" class="text-justify" :style="{
                                            'position': 'absolute', 'width': '100%',
                                            'white-space': 'normal', color: middleHint3[index].color, 'opacity': 'unset',
                                            'font-size': middleHint3[index].fontSize + 'px',
                                            'top': 100 * middleHint3[index].positionY + '%',
                                            'left': -100 * middleHint3[index].positionX + '%', 'padding': '0px'
                                        }">{{
    middleHint3[index] && middleHint3[index].text &&
    middleHint3[index].text.trim().length > 0 ? middleHint3[index].text :
    '' }}</v-card-subtitle>
                                        <v-img cover :style="{
                                            'position': 'absolute', 'top': 100 * middleHintImage[index].positionY + '%', 'opacity': middleHintImage[index].opacity,
                                            'left': 100 * middleHintImage[index].positionX + '%', 'border-radius': middleHintImage[index].borderRadius + 'px',
                                            'width': middleHintImage[index].width + '%', 'height': middleHintImage[index].height + '%',
                                        }" draggable="true" ondragstart="dragStart"
                                            :src="`${middleHintImage[index] &&
                                                middleHintImage[index].url ? baseUrl + middleHintImage[index].url : ''}`"></v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-carousel-item>
                    </div>
                    <div v-else>
                        <v-carousel-item v-for="(  image, index  ) in defaultCarouselImages" :key="index"
                            class="mainCarouselItem">
                            <v-img gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                :style="{ 'height': imageHeight + 'px', 'filter': `blur(${image.blureAmount}px)`, 'object-fit': 'cover' }"
                                :src="image.imageUrl">
                            </v-img>
                            <v-row class="ma-0 justify-center align-center w-100 h-100 carsoule-image-card">
                                <v-col cols="8" md="5">
                                    <v-card style="
                                        background-color: rgba(250, 250, 250,.5);
                                        letter-spacing: 5px"
                                        class=" w-100 h-100 rounded-lg text-black-darken-4 font-weight-bold">
                                        <v-card-title>{{ image.middleHint1 }}</v-card-title>
                                        <v-card-subtitle>{{ image.middleHint2 }}</v-card-subtitle>
                                        <v-card-text>{{ image.middleHint3 }}</v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-carousel-item>
                    </div>
                </v-carousel>
            </v-locale-provider>
        </v-col>
    </v-row>
</template>
<script>
import { PostData_formData, baseURL } from "@/services/remotedatamodify.js"
import { useMainStore } from '@/store/main';
export default {
    data() {
        return {
            baseUrl: baseURL,
            imageHeight: 0
        }
    },
    props: {
        images: [],
        defaultCarouselImages: [],
        blurAmount: [],
        middleHint1: [],
        middleHint2: [],
        middleHint3: [],
        middleHintImage: [],
        middleMainBox: []
    },
    computed: {
        aph() {
            return useMainStore().aph
        },
        imageHeight() {
            let x = this.$vuetify.display.name;
            switch (x) {
                case 'xl':
                case 'xxl':
                case "lg":
                case "md":
                    return 400;
                    break;
                case 'sm':
                    return 300;
                    break;
                case "xs":
                    return 200;
                    break;
                default:
                    return 300;
                    break;
            }
        }
    },
    created() {
        let x = this.$vuetify.display.name;
        switch (x) {
            case 'xl':
            case 'xxl':
            case "lg":
            case "md":
                this.imageHeight = 450;
                break;
            case 'sm':
                this.imageHeight = 300;
                break;
            case "xs":
                this.imageHeight = 150;
                break;
            default:
                break;
        }
    },
}
</script>
<style>
#carouselImageSelection .v-btn.v-btn--elevated.v-btn--icon.v-theme--light.v-btn--density-default.v-btn--size-default.v-btn--variant-elevated.v-window__right {
    position: relative;
    z-index: 200000;
}

.v-application__wrap {
    overflow: hidden;
}

.carsoule-image-card {
    position: absolute;
    top: 0;
}


#mainCarousel .v-img__img.v-img__img--contain {
    object-fit: cover;
}

@media screen and (max-width:600px) {
    #mainCarousel>.v-window__container>.v-window__controls>.v-btn {
        width: 25px !important;
        height: 25px !important;
    }

    #mainCarousel>.v-carousel__controls {
        height: 15px !important;
    }
}
</style>

