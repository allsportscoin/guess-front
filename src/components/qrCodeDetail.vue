<template>
  <div class="qrCodeDetail">
      <div class="popwrap" v-if="copySuc === true">
          Copied to clipboard
      </div>
      <div class="popwrap" v-if="copySuc === false">
          Copy to clipboard failed
      </div>
      <p  class="header" v-if="currentTopData1">
          <router-link to="/" tag="a" class="leftArrowWrap" ><img src="../assets/leftArrow.png" class="leftArrow"></router-link>
          Place Your Bet
          <router-link to="/faq" tag="a"><img src="../assets/rule.png" class="rule"></router-link>
      </p>
      <p class="tips" v-if="!stop && finalTime">The bet will be end in {{finalTime}}</p>
      <p class="tips" :class="{'redBg':stop}" v-if="stop">The bet was over, don’t transfer soc any more</p>
      <div class="yourBet">
          <p class="betOnTeam" v-if="betOnTeamName">Bet on {{betOnTeamName}}</p>
          <p class="teamVsTeam" v-if="currentTopData1">{{currentTopData1.teamA}} vs {{currentTopData1.teamB}}</p>
          <span class="sp">SP: {{currentSp}}</span>
      </div>
      <div class="qrCodePart" v-if="!stop">
          <p class="qrCodeTipWord">To place your bet, send CLAMs to:</p>
          <div class="qrCodeCopy">
              <p class="codewrap"><span class="code" v-if="qrCode">{{qrCode}}</span></p>
              <a href="javascript:;" class="copyWrap" v-clipboard:success="copySuccess" v-clipboard:error="copyError" v-clipboard:copy="qrCode"><img src="../assets/copyLogo.png" alt="" class="copyLogo">Copy</a>
          </div>
          <qriously :value="qrCode" :size="120" v-if="qrCode"/>
      </div>
      <div class="attention">
          <p>Attention:</p>
          <p>- Any Clam of less than 100 SOC will be ignored.</p>
          <p>- Any Clam after the deadline of this bet will be ignored</p>
          <p>- To get a return, you have to correctly predict the game’s full time result (e.g. win, draw or lose).</p>
          <p>- All bets placed will be settled at starting price (SP). The SP, or starting price, is the price declared on each option once a match has started. The SP is subject to fluctuation till the game starts.</p>
          <p>- Send as many SOC as you would like to bet ( must be over 100 SOC ) on your selection to the address above.</p>
          <p>- Your bet will be created as soon as it enters the blockchain.</p>
      </div>
      <p class="copyRight">Copyright © 2018, All Sports Chain. All rights reserved.</p>
  </div>
</template>

<script>
import Vue from 'vue';
import VueQriously from 'vue-qriously';
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);
Vue.use(VueQriously);
export default {
  name: 'qrCodeDetail',
  data () {
        return {
            matchId: '',
            betOn: '',
            stop: false,
            timer: null,
            countNum: '',
            finalTime: '',
            copySuc: null
        }
    },
    computed: {
        betList () {
            return this.$store.getters.getBetListData;
        },
        currentTopData1 () {
            if (this.betList.length!==0) {
                for (let i = 0; i < this.betList.length; i++) {
                    for (let j = 0; j < this.betList[i].matchs.length; j++) {
                        if (Number(this.betList[i].matchs[j].matchid) === this.matchId) {
                            console.log('yyyy', this.betList[i].matchs[j]);
                            return this.betList[i].matchs[j];
                        }
                    }
                }
            }
        },
        betOnTeamName () {
            if (this.betOn === 'home') {
                if (this.currentTopData1) {
                    return this.currentTopData1.teamA;
                }
            } else if (this.betOn === 'draw') {
                return 'draw';
            } else if (this.betOn === 'away') {
                if (this.currentTopData1) {
                    return this.currentTopData1.teamB;
                }
            }
        },
        currentSp () {
            if (this.betOn === 'home') {
                if (this.currentTopData1) {
                    return this.currentTopData1.sp_home;
                }
            } else if (this.betOn === 'draw') {
                if (this.currentTopData1) {
                    return this.currentTopData1.sp_draw;
                }
            } else if (this.betOn === 'away') {
                if (this.currentTopData1) {
                    return this.currentTopData1.sp_away;
                }
            }
        },
        qrCode () {
            if (this.currentTopData1) {
                if (this.betOn === 'home') {
                    return this.currentTopData1.address_home;
                } else if (this.betOn === 'draw') {
                    return this.currentTopData1.address_draw;
                } else if (this.betOn === 'away') {
                    return this.currentTopData1.address_away;
                }
            }
        },
    },
    created () {
        this.matchId = Number(this.$route.query.matchId);
        this.betOn = this.$route.query.betOn;
    },
    mounted () {
        this.intervalFn();
    },
    methods: {
        copySuccess () {
            console.log('copy success');
            this.copySuc = true;
            setTimeout(()=>{
                this.copySuc = null;
            }, 1500);
        },
        copyError () {
            console.log('copy fail');
            this.copySuc = false;
            setTimeout(()=>{
                this.copySuc = null;
            }, 1500);
        },
        countDownTime () {
            let  finalTime = '0 day 0 h 0 min 0 sec';
            if (this.currentTopData1 && this.currentTopData1.begin_time) {
                let timeNow = new Date();
                let timeFinal = new Date(this.currentTopData1.begin_time * 1000);
                let time = Math.floor((timeFinal - timeNow - 5 * 3600)/1000);
                if (time >= 0){
                    this.stop = false;
                    let day = Math.floor(time / 86400);
                    let hour = Math.floor(time % 86400 / 3600);
                    let minite = Math.floor(time % 86400 % 3600 / 60);
                    let second = Math.floor(time % 60);
                    finalTime = day + 'day ' + hour + 'h ' + minite + 'min ' + second + 'sec ';
                } else {
                    this.stop = true;
                }
            }
            this.finalTime = finalTime;
        },
        intervalFn () {
            clearInterval(this.timer);
            if (!this.stop) {
                this.timer = setInterval(()=>{
                    this.countDownTime();
                }, 1000);
            } else {
                clearInterval(this.timer);
            }
        }
    },
    components: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a{
        text-decoration: none;
        font-size: 28px;
        color:#1a9248;
    }
    .popwrap{
        position: fixed;
        top: 50%;
        left: 50%;
        width: 400px;
        height: 100px;
        color:#fff;
        margin-left: -200px;
        margin-top: -50px;
        line-height: 100px;
        text-align: center;
        border-radius: 4px;
        letter-spacing: 1px;
        background: rgba(0,0,0,0.5);
        font-size: 18px;
    }
    .qrCodeDetail{
        background: #eff1f4;
        height: 100%;
    }
    .header{
        height: 90px;
        line-height: 90px;
        background: #1a9248;
        color:#fff;
        font-size: 32px;
        text-align: center;
        position: relative;
    }
    .leftArrowWrap{
        width: 300px;
        height: 90px;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .leftArrow{
        width: 22px;
        position: absolute;
        top: 28px;
        left: 30px;
    }
    .rule{
        position: absolute;
        width: 120px;
        top: 26px;
        right: 30px;
    }
    .tips{
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #1a9248;
        background: #d4f0df;
        text-align: center;
    }
    .yourBet{
        height: 150px;
        position: relative;
        background: #fff;
        padding: 0 30px;
        margin-bottom: 15px;
    }
    .betOnTeam{
        color:#2d2f32;
        font-size: 34px;
        line-height: 50px;
        padding-top: 30px;
    }
    .teamVsTeam{
        line-height: 50px;
        font-size: 28px;
        color:#606369;
    }
    .sp{
        color:#1a9248;
        font-size: 28px;
        position: absolute;
        top: 40px;
        right: 30px;
    }
    .qrCodePart{
        padding: 30px;
        background: #fff;

    }
    .qrCodeTipWord{
        color:#606369;
        font-size: 28px;
        margin-bottom: 20px;
    }
    .qrCodeCopy{
        width: 690px;
        height: 70px;
        line-height: 70px;
        background: #eff1f4;
        color:#606369;
        font-size: 24px;
        overflow: hidden;
        margin-bottom: 40px;
    }
    .codewrap{
        width: 550px;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        padding-right: 10px;
        margin-top: 15px;
        margin-right: 15px;
        border-right: 1px solid #b5bcc4;/*no*/
        float: left;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
    }
    .code{
        height: 40px;
        width: 600px;
        display: inline-block;
        font-size: 24px;
        line-height: 40px;
        -webkit-transform: scale(0.90);
        transform: scale(0.90);
        position: absolute;
        left: -10px;
        top: 4px;
    }
    .copyWrap{
        width: 120px;
        overflow: hidden;
        float: left;
    }
    .copyLogo{
        width: 29px;
        height: 29px;
        position: relative;
        top: 4px;
        margin-right: 5px;
    }
    .ma{
        width: 200px;
        height: 200px;
        margin-top: 30px;
    }
    .attention{
        padding: 35px 30px;
        color:#8c9399;
        font-size: 24px;
        line-height: 45px;
        background: #eff1f4;
    }
    .copyRight{
        font-size: 20px;
        text-align: center;
        color:#606369;
        transform: scale(0.9);
        line-height: 80px;
    }
    .redBg{
        background: #e23505;
        color:#fff;
    }
</style>
