<template>
  <div class="faq">
      <router-link to="/"><p class="header"><img src="../assets/leftArrow.png" class="leftArrow">Frequently Asked Questions</p></router-link>
      <div class="faqContent">
          <p class="general">General</p>
          <dl>
             <dt>What is SOC ?</dt>
             <dd>SOC is a digitally-encrypted virtual currency based on blockchain and smart contract technology that is tailored to sporting contents, community-based incentives and spendings on different scenarios. SOC is a non-refundable functional utility token which will be used as the unit of exchange (e.g. for smart contracts and trade of digital assets) between participants on the All Sports Platform.</dd>
          </dl>
          <dl>
             <dt>What is SPORTS GUESSING?</dt>
             <dd>You can guess the fulltime result of a certain game with SOC. To get a return, you have to correctly predict the game’s full time result.</dd>
          </dl>
      </div>

      <div class="faqContent">
          <p class="general">SportsBook</p>
          <dl>
             <dt>What is the minimum amount of guessing ?</dt>
             <dd>100 SOC.</dd>
          </dl>
          <dl>
             <dt>What is full time result? Does extra time and penalty shoot-outs count?</dt>
             <dd>The terms full time, normal time,and 90 minutes play are all used to denote the period of play. This includes any injury/stoppage time added on by the match official at the end of normal time. Extra time and penalty shoot-outs do not count unless otherwise stated.</dd>
          </dl>
          <dl>
              <dt>What is SP?</dt>
              <dd>The SP, or starting price, is the price declared on each option once a match has started. This is the price declared for each option in the official match result.</dd>
          </dl>
      </div>
      <p class="copyRight">Copyright © 2018, All Sports Chain. All rights reserved</p>
  </div>
</template>

<script>
export default {
  name: 'faq',
  data () {
      return {
      }
   },
   created () {

   },
   mounted () {
   },
   methods: {

   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a{
        text-decoration: none;
    }
    .header{
        width: 100%;
        height: 90px;
        line-height: 90px;
        background: #1a9248;
        font-size: 32px;
        color:#fff;
        text-align: center;
    }
    .leftArrow{
        width: 22px;
        float: left;
        margin-left: 30px;
        margin-top: 28px;
    }
    .general{
        font-size: 24px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #8c9399;
        background: #eff1f4;
        padding-left: 30px;
        box-sizing: border-box;
    }
    .faqContent dl{
        padding: 0 28px;
    }
    .faqContent dt{
        color: #2d2f32;
        margin-top: 35px;
        margin-bottom: 25px;
        font-size: 32px;
    }
    .faqContent dd{
        color: #606369;
        line-height: 45px;
        font-size: 28px;
        margin-bottom: 20px;
    }
    .copyRight{
        font-size: 20px;
        text-align: center;
        color:#606369;
        line-height: 80px;
        background: #eff1f4;
        margin-top: 80px;
    }
</style>
