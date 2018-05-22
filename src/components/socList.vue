<template>
  <div class="socBet">
      <div class="header">
          <img src="../assets/socLogoText.png" class="socLogo" alt="">
          <router-link to="/faq"><img src="../assets/rule.png" class="rule" alt=""></router-link>
      </div>
      <div class="contentWrap">
          <div class="toggleWrap">
              <div class="toggle">
                  <span :class="{'select': betShow === true}" @click="toggleFn('bet')">Bet<img src="../assets/arrow.png" class="arrow" :class="{'hidden':!(betShow === true)}"></span><span :class="{'select': earlierMatchesShow === true}" @click="toggleFn('earlierMatches')">Earlier Matches<img src="../assets/arrow.png" class="arrow" :class="{'hidden':!(earlierMatchesShow === true)}"></span>
              </div>
          </div>
          <div class="betDataListWrap" v-if="betShow === true">
              <div class="dataList" v-for="(item,index) in betList">
                  <p class="title">{{listTitleTodayOrTomorrow(item.day)}} {{listTitleDate(item.day)}}</p>
                  <div class="dataUnit" v-for="(elem,i) in item.matchs">
                      <div class="teamDetail">
                          <span class="teamAName">{{elem.teamA}}</span>
                          <dl class="vsTime">
                              <dt class="vs">VS</dt>
                              <dd>{{getHourMin(elem.begin_time)}}</dd>
                          </dl>
                          <span class="teamBName">{{elem.teamB}}</span>
                      </div>
                      <div class="betOptionWrap">
                          <div class="betOption">
                              <dl @click="qrDetail('home', elem)">
                                  <dt>Home</dt>
                                  <dd>SP: {{elem.sp_home}}</dd>
                              </dl>
                              <dl @click="qrDetail('draw', elem)">
                                  <dt>Draw</dt>
                                  <dd>SP: {{elem.sp_draw}}</dd>
                              </dl>
                              <dl @click="qrDetail('away', elem)">
                                  <dt>Away</dt>
                                  <dd>SP: {{elem.sp_away}}</dd>
                              </dl>
                          </div>
                      </div>
                      <div>
                          <span class="detailWrap"><img src="../assets/socLogo.png" alt="" class="smLogo">{{elem.total_soc}}</span>
                          <a @click="toDetailRoute(elem)" class="detailText" >Detail Records ></a>
                      </div>
                  </div>
              </div>
          </div>
          <div class="earlierMatchDataListWrap" v-if="earlierMatchesShow === true">
              <div class="dataList" v-for="(item1,index1) in earlierMatchesList">
                  <p class="title">{{listTitleTodayOrTomorrow(item1.day)}} {{listTitleDate(item1.day)}}</p>
                  <div class="dataUnit" v-for="(elem,i) in item1.matchs">
                      <div class="teamDetail">
                          <span class="teamAName">{{elem.teamA}}</span>
                          <dl class="vsTime vsUnstart" v-if="elem.status === 3">
                              <dt class="vs">VS</dt>
                              <dd>About to start</dd>
                          </dl>
                          <dl class="vsTime vsStartIn" v-if="elem.status === 2">
                              <dt class="vs">{{elem.score}}</dt>
                              <dd>Playing</dd>
                          </dl>
                          <dl class="vsTime vsEnd" v-if="elem.status === 4 || elem.status === 5">
                              <dt class="vs">{{elem.score}}</dt>
                              <dd>End</dd>
                          </dl>
                          <span class="teamBName">{{elem.teamB}}</span>
                      </div>
                      <div class="betOptionWrap">
                          <div class="betOption">
                              <dl :class="{'selected':(elem.status === 4 && elem.result === 0)}">
                                  <dt>Home</dt>
                                  <dd>SP: {{elem.sp_home}}</dd>
                              </dl>
                              <dl :class="{'selected':(elem.status === 4 && elem.result === 1)}">
                                  <dt>Draw</dt>
                                  <dd>SP: {{elem.sp_draw}}</dd>
                              </dl>
                              <dl :class="{'selected':(elem.status === 4 && elem.result === 2)}">
                                  <dt>Away</dt>
                                  <dd>SP: {{elem.sp_away}}</dd>
                              </dl>
                          </div>
                      </div>
                      <div class="">
                          <span class="detailWrap"><img src="../assets/socLogo.png" alt="" class="smLogo">{{elem.total_soc}}</span>
                          <a @click="toDetailRoute(elem)" class="detailText" >Detail Records ></a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <p class="copyRight">Copyright © 2018, All Sports Chain. All rights reserved.</p>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$http = axios;
export default {
  name: 'socList',
  data () {
      return {
          betShow: this.$store.getters.toggleSelected === 'bet',
          earlierMatchesShow: this.$store.getters.toggleSelected === 'earli'
      }
   },
   created () {
   },
   mounted () {
   },
   computed: {
       toggleSelected () {
           return this.$store.getters.toggleSelected;
       },
       betList () {
           return this.$store.getters.getBetListData;
       },
       earlierMatchesList () {
           return this.$store.getters.getearlierMatchesListData;
       }
   },
   methods: {
       toDetailRoute (param){
           this.$store.commit('gotoDetail', param);
           this.$router.push(`/earlierMatchesDetail?matchId=${param.matchid}&tab=${this.toggleSelected}`);
       },
       qrDetail (posit,data) {
           if (data.status === 1) {
               this.$router.push(`/qrCodeDetail?matchId=${data.matchid}&betOn=${posit}`);
           }
       },
       toggleFn (param) {
           if (param === 'bet') {
               this.betShow = true;
               this.earlierMatchesShow = false;
               this.$store.commit('chooseToggle', 'bet');
           } else if (param === 'earlierMatches') {
               this.betShow = false;
               this.earlierMatchesShow = true;
               this.$store.commit('chooseToggle', 'earli');
           }
       },
       listTitleTodayOrTomorrow (str1) {
           str1 = Number(str1);
           let date = new Date(str1*1000);
           let year = date.getFullYear();
           let month = this.dateToDubble(date.getMonth()+1);
           let day =  this.dateToDubble(date.getDate());
           let todayGetDate = year + '-' + month + '-' + day;
           let judgeToday = new Date(todayGetDate);
           //today
           let today = new Date();
           let todayYear = today.getFullYear();
           let todayMonth =  this.dateToDubble(today.getMonth()+1);
           let todayDay =  this.dateToDubble(today.getDate());
           let todayTime = todayYear + '-' + todayMonth + '-' + todayDay;
           let todayStamp = new Date(todayTime);
           //tomorrow
           let dateTomorrow = new Date();
           dateTomorrow.setTime(today.getTime() + 24*60*60*1000);
           let tomorrowMonth = dateTomorrow.getMonth() + 1;
           let tomorrowDate = dateTomorrow.getDate();
           tomorrowMonth = this.dateToDubble(tomorrowMonth);
           tomorrowDate = this.dateToDubble(tomorrowDate);
           let tomorrowGetDate = dateTomorrow.getFullYear() + '-' + tomorrowMonth + '-' + tomorrowDate;
           let judgeTomorrow = new Date(tomorrowGetDate);
           if (judgeToday.getTime() === todayStamp.getTime()) {
               return 'Today';
           } else if (judgeTomorrow.getTime() === judgeToday.getTime()) {
               return 'Tomorrow';
           }
       },
       dateToDubble:function(str){
           if(str < 10){
               return '0' + str;
           }else{
               return str;
           }
       },
       listTitleDate (str1) {
           str1 = Number(str1);
           let date = new Date(str1*1000);
           let year = date.getFullYear();
           let month = this.dateToDubble(date.getMonth()+1);
           let day =  this.dateToDubble(date.getDate());
           let todayGetDate = year + '-' + month + '-' + day;
           let judgeToday = new Date(todayGetDate);
           let dateArr = ('' + date).split(' ');
           let finalDay = dateArr[2];
           let finalYear = dateArr[3];
           let finalMonth = dateArr[1];
           let todayShowTime = finalDay + ' ' + finalMonth + ' ' + finalYear;
           return todayShowTime;
       },
       getHourMin (str1) {
           // str1 = Number (1524223800*1000);
           str1 = Number (str1*1000);
           let date = new Date(str1);
           let hour =  Number(date.getHours());
           let min =  Number(date.getMinutes());
           let finalHm = this.dateToDubble(hour) + ':' + this.dateToDubble(min);
           if (hour >= 12) {
               return finalHm + ' PM';
           } else {
               return finalHm + ' AM';
           }
       }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @font-face {
        font-family: "toggleFont";
        src: url(../assets/DINCond-Bold.otf) format('truetype');
    }
    .header{
        width: 100%;
        height: 90px;
        background: #1a9248;
    }
    .socLogo{
        width: 320px;
        height: 46px;
        display: inline-block;
        margin-left: 30px;
        margin-top: 22px;
        float: left;
    }
    .rule{
        float: right;
        width: 120px;
        margin-top: 26px;
        margin-right: 30px;
    }
    .contentWrap{
        width: 100%;
        background: #eff1f4;
    }
    .toggleWrap{
        padding: 20px 0;
    }
    .toggle{
        font-family: toggleFont;
        width: 536px;
        height: 56px;
        background: #eff1f4;
        line-height: 56px;
        text-align: center;
        margin: 0px auto;
        border: 2px solid #1a9248;
    }
    .toggle span{
        display: inline-block;
        width: 50%;
        font-size: 34px;
        position: relative;
        color:#1a9248;
        height: 100%;
    }
    .toggle span.select{
        background: #1a9248;
        color:#fff;
    }
    .arrow{
        width: 18px;
        position: absolute;
        top: 58px;
        left: 50%;
        margin-left: -9px;
    }
    .title{
        width: 100%;
        height: 50px;
        background: #d7dce3;
        color:#606369;
        line-height: 50px;
        padding-left: 30px;
        font-size: 24px;
        box-sizing: border-box;
    }
    .hidden{
        visibility: hidden;
    }
    .dataUnit{
        padding: 25px 30px;
        background: #fff;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #eff1f4;/*no*/
    }
    .teamDetail{
        height: auto;
        overflow: hidden;
        margin-bottom: 20px;
    }
    .teamDetail span{
        width: 220px;
        height: 60px;
        float: left;
        display: inline-block;
        text-align: center;
        margin-top: 8px;
        color:#2d2f32;
        font-size: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .vsTime{
        float: left;
        color:#606369;
        width: 240px;
    }
    .vsTime dd{
        font-size: 20px;
        transform: scale(0.9);
        text-align: center;
        overflow: hidden;
    }
    .vs{
        color:#8c9399;
        font-size: 24px;
        text-align: center;
        margin-bottom: 10px;
    }
    .betOptionWrap{
        width: 100%;
        display: table;
        text-align: center;
        margin-bottom: 25px;
    }
    .betOption{
        /* overflow: hidden; */
        display: table-cell;
    }
    .betOption dl{
        width: 214px;
        height: 70px;
        display: inline-block;
        border: 1px solid #bdc3ca;/*no*/
        border-radius: 8px;
        text-align: center;
        padding: 10px 0;
        background: #f9fafc;
        overflow: hidden;
    }
    .betOption dl dt{
        font-size: 32px;
        color:#2d2f32;
    }
    .betOption dl dd{
        color:#1a9248;
        line-height: 40px;
        font-size: 24px;
    }
    .smLogo{
        width: 24px;
        display: inline-block;
        margin-right: 12px;
        position: relative;
        top: 3px;
    }
    .detailText{
        color:#8c9399;
        font-size: 24px;
        margin-left: 20px;
        text-decoration: none;
    }
    .detailWrap{
        color:#1a9248;
    }
    .copyRight{
        font-size: 20px;
        text-align: center;
        color:#606369;
        transform: scale(0.9);
        line-height: 80px;
    }
    .vsUnstart dd{
        color: #1a9248;
    }
    .vsStartIn dt,.vsStartIn dd{
        color: #1a9248;
    }
    .vsEnd dt{
        color:#2d2f32;
    }
    .vsEnd dd{
        color: #606369;
    }
    .earlierMatchDataListWrap .selected{
        background: #5eb780 !important;
    }
    .earlierMatchDataListWrap .selected dt,.earlierMatchDataListWrap .selected dd{
        color: #fff !important;
    }
    .earlierMatchDataListWrap .betOption dl{
        background: #f9fafc;
    }
</style>
