<template>
  <div class="earlierMatchesDetail">
      <router-link to="/" tag="p" class="header" v-if="currentTopData"><img src="../assets/leftArrow.png" class="leftArrow">{{currentTopData.teamA}} vs {{currentTopData.teamB}}</router-link>
      <div class="dataUnit" v-if="currentTopData">
          <div class="teamDetail">
              <span class="teamAName">{{currentTopData.teamA}}</span>
              <dl class="vsTime vsUnstart" v-if="currentTopData.status===1 || currentTopData.status===3">
                  <dt class="vs">VS</dt>
                  <dd>About to start</dd>
              </dl>
              <dl class="vsTime vsStartIn" v-if="currentTopData.status===2">
                  <dt class="vs">{{currentTopData.score}}</dt>
                  <dd>Playing</dd>
              </dl>
              <dl class="vsTime vsEnd" v-if="currentTopData.status===4 || currentTopData.status===5">
                  <dt class="vs">{{currentTopData.score}}</dt>
                  <dd>End</dd>
              </dl>
              <span class="teamBName">{{currentTopData.teamB}}</span>
          </div>
          <div class="betOptionWrap">
              <div class="betOption">
                  <dl @click="qrDetail('home')" :class="{'selected': currentTopData.status===4 && currentTopData.result === 0}">
                      <dt>Home</dt>
                      <dd>SP: {{currentTopData.sp_home}}</dd>
                  </dl>
                  <dl @click="qrDetail('draw')" :class="{'selected': currentTopData.status===4 && currentTopData.result === 1}">
                      <dt>Draw</dt>
                      <dd>SP: {{currentTopData.sp_draw}}</dd>
                  </dl>
                  <dl @click="qrDetail('away')" :class="{'selected': currentTopData.status===4 && currentTopData.result === 2}">
                      <dt>Away</dt>
                      <dd>SP: {{currentTopData.sp_away}}</dd>
                  </dl>
              </div>
          </div>
          <div><span class="detailWrap"><img src="../assets/socLogo.png" alt="" class="smLogo">{{currentTopData.total_soc}}</span> </a></div>
      </div>
      <div class="detailRecordsWrap">
          <p class="detailRecordsText">Detail Records</p>
          <template v-for="(elem,index) in betRecord" v-if="betRecord && betRecord.length>0">
              <div class="win" v-if="elem.bet_result === 1">
                  <div class="top">
                      <span class="stateWin">Win</span>
                      <p><span class="idNumber">#{{elem.id}}</span><span class="timeNumber">{{betTime(elem.bet_time)}}</span></p>
                      <p v-for="(e,i) in elem.txid_list"><span class="transId">Trans. ID</span><a :href="e.txid_url" class="idNumSimplify">{{e.txid}}</a></p>
                      <p class="myBetWrap"><span class="myBet">Bet: {{elem.bet_team}}</span><span class="myBetMoney">Amount: {{elem.bet_soc}}<img src="../assets/socLogo.png"></span></p>
                  </div>
                  <div class="bottom">
                      <p><span class="transId">Trans. ID</span><a :href="elem.reward_record.txid_url" class="idNumSimplify">{{elem.reward_record.txid}}</a></p>
                      <p class="btmMoney"><span class="myBetMoney">Amount: {{elem.reward_total}}<img src="../assets/socLogo.png"></span></p>
                  </div>
              </div>
              <div class="stakeRefund" v-if="elem.bet_result === 2">
                  <div class="top">
                      <span class="stateRefund">Stake refund</span>
                      <p><span class="idNumber">#{{elem.id}}</span><span class="timeNumber">{{betTime(elem.bet_time)}}</span></p>
                      <p v-for="(e,i) in elem.txid_list"><span class="transId">Trans. ID</span><a :href="e.txid_url" class="idNumSimplify">{{e.txid}}</a></p>
                      <p class="myBetWrap"><span class="myBet">Bet: {{elem.bet_team}}</span><span class="myBetMoney">bet: {{elem.bet_soc}}<img src="../assets/socLogo.png"></span></p>
                  </div>
                  <div class="bottom">
                      <p><span class="transId">Trans. ID</span><a :href="elem.reward_record.txid_url" class="idNumSimplify">{{elem.reward_record.txid}}</a></p>
                      <p class="btmMoney"><span class="myBetMoney">Refund: {{elem.reward_total}}<img src="../assets/socLogo.png"></span></p>
                  </div>
              </div>
              <div class="lose" v-if="elem.bet_result === 3">
                  <div class="top">
                      <span class="stateLose">Lose</span>
                      <p><span class="idNumber">#{{elem.id}}</span><span class="timeNumber">{{betTime(elem.bet_time)}}</span></p>
                      <p v-for="(e,i) in elem.txid_list"><span class="transId">Trans. ID</span><a :href="e.txid_url" class="idNumSimplify">{{e.txid}}</a></p>
                      <p class="myBetWrap"><span class="myBet">Bet: {{elem.bet_team}}</span><span class="myBetMoney">bet: {{elem.bet_soc}}<img src="../assets/socLogo.png"></span></p>
                  </div>
              </div>
              <div class="toBeOpened" v-if="elem.bet_result === 4">
                  <div class="top">
                      <span class="stateToBeOpened">To be opened</span>
                      <p><span class="idNumber">#{{elem.id}}</span><span class="timeNumber">{{betTime(elem.bet_time)}}</span></p>
                      <p v-for="(e,i) in elem.txid_list"><span class="transId">Trans. ID</span><a :href="e.txid_url" class="idNumSimplify">{{e.txid}}</a></p>
                      <p class="myBetWrap"><span class="myBet">Bet: {{elem.bet_team}}</span><span class="myBetMoney">bet: {{elem.bet_soc}}<img src="../assets/socLogo.png"></span></p>
                  </div>
              </div>
          </template>
          <p class="noRecord" v-if="betRecord && betRecord.length === 0">no record</p>
      </div>
      <p class="copyRight">Copyright © 2018, All Sports Chain. All rights reserved.</p>
  </div>
</template>

<script>
export default {
  name: 'earlierMatchesDetail',
  data () {
        return {
            earlierMatchesDetailData: {},
            matchId: null,
            betRecord: [],
            earliList: [],
            tab: '',
        }
    },
    computed: {
        toggleSelect () {
            return this.$store.getters.toggleSelected;
        },
        betList () {
            return this.$store.getters.getBetListData;
        },
        earlierMatchesList () {
            return this.$store.getters.getearlierMatchesListData;
        },
        currentTopData () {
            let currentSelected = this.tab;
            if ((this.betList && this.betList.length!==0) || (this.earlierMatchesList && this.earlierMatchesList.length!==0)) {
                if (currentSelected === 'bet') {
                    for (let i = 0; i < this.betList.length; i++) {
                        for (let j = 0; j < this.betList[i].matchs.length; j++) {
                            if (Number(this.betList[i].matchs[j].matchid) === this.matchId) {
                                return this.betList[i].matchs[j];
                            }
                        }
                    }
                } else if (currentSelected === 'earli') {
                    for (let i = 0; i < this.earlierMatchesList.length; i++) {
                        for (let j = 0; j < this.earlierMatchesList[i].matchs.length; j++) {
                            if (Number(this.earlierMatchesList[i].matchs[j].matchid) === this.matchId) {
                                return this.earlierMatchesList[i].matchs[j];
                            }
                        }
                    }
                }
            }
        }
    },
    created () {
        this.matchId = Number(this.$route.query.matchId);
        this.tab = this.$route.query.tab;
        this.$http.get(`${HOST}/bet/detail?matchid=${this.matchId}`).then(response => {
            if (response.data.errno === 0) {
                let betRecord = response.data.data;
                this.betRecord = betRecord.records;
            } else {
                console.log('error');
            }
        });
    },
    methods: {
        copySuccess () {
            console.log('copy success');
        },
        copyError () {
            console.log('copy fail');
        },
        qrDetail (posit) {
            if (this.currentTopData.status === 1) {
                this.$router.push(`/qrCodeDetail?matchId=${this.matchId}&betOn=${posit}`);
            }
        },
        betTime (str) {
            str = str * 1000;
            //04-20 17:46
            let date = new Date(str);
            let Month =  this.dateToDubble(date.getMonth()+1);
            let Day =  this.dateToDubble(date.getDate());
            let hour = this.dateToDubble(date.getHours());
            let min = this.dateToDubble(date.getMinutes());
            let todayTime = Month + '-' + Day + ' ' + hour + ':' + min;
            return todayTime;
        },
        dateToDubble:function(str){
            if(str < 10){
                return '0' + str;
            }else{
                return str;
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .earlierMatchesDetail{
        height: 100%;
        background: #eff1f4;
    }
    .header{
        width: 100%;
        height: 90px;
        line-height: 90px;
        background: #1a9248;
        font-size: 32px;
        color:#fff;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .leftArrow{
        width: 22px;
        float: left;
        margin-left: 30px;
        margin-top: 28px;
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    .detailWrap{
        color:#1a9248;
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
    .dataUnit .selected{
        background: #5eb780;
    }
    .dataUnit .selected dt,.dataUnit .selected dd{
        color: #fff !important;
    }
    .detailRecordsText{
        height: 50px;
        line-height: 50px;
        text-align: left;
        font-size: 24px;
        background: #eff1f4;
        color:#606369;
        padding-left: 30px;
    }
    .top{
        padding: 30px;
        border-bottom: 1px solid #eff1f4; /*no*/
    }
    .bottom{
        padding: 30px;
        font-size: 28px;
        line-height: 40px;
    }
    .btmMoney{
        overflow: hidden;
    }
    .top p{
        line-height: 50px;
        font-size: 28px;
        color:#2d2f32;
    }
    .win{
        position: relative;
        background: #fff;
    }
    .idNumber{
        width: 190px;
        color:#2d2f32;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .timeNumber{
        width: 290px;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color:#606369;
    }
    .stateWin{
        position: absolute;
        top: 30px;
        right: 30px;
        color:#1a9248;
        font-size: 28px;
    }
    .transId{
        width: 190px;
        color:#606369;
        display: inline-block;
        float: left;
    }
    .idNumSimplify{
        color:#3c8dbc;
        text-decoration: none;
        width:290px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
    }
    .myBetWrap{
        overflow: hidden;
    }
    .myBet{
        font-size: 28px;
        color:#2d2f32;
        float: left;
    }
    .myBetMoney{
        float: right;
        color:#2d2f32;
        font-size: 28px;
    }
    .myBetMoney img{
        display: inline-block;
        width: 26px;
        height: 26px;
        margin-left: 10px;
        position: relative;
        top: 2px;
    }
    .win,.stakeRefund,.lose,.toBeOpened{
        background: #fff;
        margin-bottom: 12px;
    }
    .stakeRefund{
        position: relative;
    }
    .stateRefund{
        position: absolute;
        top: 30px;
        right: 30px;
        color:#929cad;
        font-size: 28px;
    }
    .lose{
        position: relative;
    }
    .stateLose{
        position: absolute;
        top: 30px;
        right: 30px;
        color:#e23505;
        font-size: 28px;
    }
    .toBeOpened{
        position: relative;
    }
    .stateToBeOpened{
        position: absolute;
        top: 30px;
        right: 30px;
        color:#929cad;
        font-size: 28px;
    }
    .copyRight{
        font-size: 20px;
        text-align: center;
        color:#606369;
        transform: scale(0.9);
        line-height: 80px;
    }
    .noRecord{
        width: 100%;
        height: 500px;
        text-align: center;
        line-height: 500px;
        font-size: 30px;
        color:#606369;
    }
    @font-face {
        font-family: "toggleFont";
        src: url(../assets/DINCond-Bold.otf) format('truetype');
    }
</style>
