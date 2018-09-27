<template>
    <div class="text_relay">
        <div id="wrap">
            <div id="container" class="sports2">
                <div class="content broadcast">
                    <InningTab />
                    <TextRelaySection  :style="getStyle()" style="opacity: 0" />
                </div>
            </div>
        </div>
        <Logger />
    </div>
</template>

<script>
import Logger from '../../../../components/logger';
import InningTab from './InningTab';
import TextRelaySection from './TextRelaySection';

export default {
    name: 'App',
    components: {
        InningTab,
        TextRelaySection,
        Logger
    },
    data () {
        return {
            isShow: false
        };
    },
    methods: {
        getStyle () {
            if(this.isShow) {
                return {
                    opacity: 1
                };
            }
        }
    },
    beforeCreate () {
        if(window.LoadingLayer) {
            window.LoadingLayer.show();
        }
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                this.isShow = true;
                if(window.LoadingLayer) {
                    window.LoadingLayer.hide();
                }
            }, 500);
        });
    }
};
</script>

<style>
    /* 배경이슈로 추가 */
    .text_relay {min-height:100%;background-color:#f8f8f8;}

    /* 공통 */
    .clearfix::after { content: ''; display: block; clear: both; }

    /* layout */
    #wrap {position:relative;width:100%;height:100%;}
    #header {position:relative;width:100%;height:44px;background-color:#fff}
    #container {position:relative;width:100%;height:100%;}
    .content {position:relative;}

    /* 문자중계 */
    .content video {vertical-align:middle;}
    /*.content.broadcast {background-color:#f8f8f8;}*/ /* 웹뷰 상단 여백 이슈로 수정 */
    .content.broadcast {background-color:#f8f8f8; padding-top: 10px;} /* 웹뷰 상단 여백 이슈로 수정 */
    .inning_slide {background-color:#fff; border-bottom:1px solid #cecece;}
    /*.inning_slide .swiper-slide {margin:13px 0; color:#666; font-size:11px; width:auto; position:relative; text-align:center;} */ /* 클릭영역 이슈로 수정 */
    .inning_slide .swiper-slide {margin:0; padding: 13px 0; color:#666; font-size:11px; width:auto; position:relative; text-align:center; cursor:pointer;} /* 클릭영역 이슈로 수정 */
    .inning_slide .swiper-slide.active {font-weight:bold; color:#000;}
    .inning_slide .swiper-slide.notStart {color:#e1e1e1; cursor:default;}
    /*.inning_slide .swiper-slide+.swiper-slide::after {content:''; display:block; width:1px; height:11px; position:absolute; top:0; left:0; background-color:#e6e6e6;} */ /* 클릭영역 이슈로 수정 */
    .inning_slide .swiper-slide+.swiper-slide::after {content:''; display:block; width:1px; height:11px; position:absolute; top:50%; left:0; margin-top:-6px; background-color:#e6e6e6;} /* 클릭영역 이슈로 수정 */
    .text_broadcast {padding:10px;}
    .text_broadcast > div+div {margin-top:10px;}
    .match_state {font-size:13px; font-weight:bold; color:#151515; background-color:#fff; padding:10px;}
    .player_change {padding:10px; background-color:#fff;}
    .player_change p {font-size:11px;}
    .player_state .state_wrap {padding:15px 0 15px 15px; background-color:#fff;}
    .player_state .state_wrap > div {float:left;}
    .player_state .state_wrap .player_thumb {width:50px; height:50px; overflow:hidden; border-radius:25px;}
    .player_state .state_wrap .player_thumb img {width:100%;}
    .player_state .state_wrap .player_info {padding-left:10px; width:80%;}
    @media screen and (max-width:320px) {
        .player_state .state_wrap .player_info {width:78%;}
    }
    .player_state .state_wrap .player_info .name {color:#151515; font-size:13px; font-weight:bold; margin-bottom:12px;}
    /*.player_state .state_wrap .player_info .result {color:#ffa221;font-size:11px; margin-bottom:5px;}*/  /*하이라이트 색상 분기*/
    .player_state .state_wrap .player_info .result {font-size:11px; margin-bottom:5px;} /*하이라이트 색상 분기*/
    .player_state .state_wrap .player_info .highlight {color:#ffa221;} /*하이라이트 색상 분기*/
    .player_state .state_wrap .player_info .ball_count li {color:#151515; font-size:11px; float:left; padding-right:8px; position:relative; line-height:15px;}
    .player_state .state_wrap .player_info .ball_count li+li {padding-left:8px;}
    .player_state .state_wrap .player_info .ball_count li+li::after {content:''; display:block; width:1px; height:11px; position:absolute; top:2px; left:0; background-color:#7f7f7f;}
    .match_tab {border-bottom:1px solid #cecece; background-color:#fff;}
    .match_tab ul li {float:left; width:33%; box-sizing:border-box; margin:15px 0; font-size:13px; color:#666; text-align:center; position:relative;}
    .match_tab ul li.active {color:#000; font-weight:bold;}
    .match_tab ul li+li::after {content:''; display:block; width:1px; height:13px; position:absolute; top:0; left:0; background-color:#cecece;}
    .content .fixed {position:fixed; width:100%; top:0; z-index:2;}
    .content.broadcast.nomatch {height:100%;}
    .content.broadcast .only_text {font-size:14px; color:#888; text-align:center; background-color:#fff; border-bottom:1px solid #cecece;}
    .content.broadcast .only_text img {display:block; width:50px; margin:0 auto 10px;}
    .content.broadcast .text {padding:95px 0;}
    .content.broadcast .nomatch {padding:50px 0 85px;}
    .content.broadcast .error {padding:60px 0; color:#000; font-size:13px;}
</style>
