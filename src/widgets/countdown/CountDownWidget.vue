<template>
	<div class="countdown-container">
		<div class="countdown-title">生日</div>
		<div class="countdown-one">
			<div class="countdown-text">还有</div>
			<div class="countdown-line"></div>
			<div class="countdown-center">1231</div>
			<div class="countdown-day">天</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: '生日',
				day: 16,
			};
		},
		methods: {
			onWidgetClick() {
			}
		},
	};
</script>
<style lang="scss" scoped>
body * {
  background: transparent;
  overflow: hidden;
  margin: 0;
}

.countdown-container {
  overflow: hidden;
  background-color: #FFC455;
  border-radius: 20px;
  height: 100%;
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;

  .countdown-title{
	  margin-top: 3.8%;
	  width: 100%;
	  height: 18%;
	  text-align: center;
	  font-size: 40px;
	  font-family: OPPOSans-Medium, OPPOSans;
	  font-weight: 500;
	  color: #FFFFFF;
	  line-height: 24px;
	  letter-spacing: 1px;
	  -webkit-background-clip: text;
  }

  .countdown-one{
	  width: 82%;
	  height: 64%;
	  background: #FFFFFF;
	  box-shadow: 0px 3px 5px 0px rgba(204,157,68,0.5);
	  border-radius: 16px 16px 16px 16px;
	  opacity: 1;
	  margin-left: 9%;

	  .countdown-text{
		   width: 26.4%;
		   height: 21%;
		   margin-top: 4%;
		   margin-left: 36.8%;
		   padding-top: 4%;
		   font-size: 32px;
		   font-family: OPPOSans-Medium, OPPOSans;
		   font-weight: 500;
		   color: #878D9C;
		   line-height: 21%;
		   letter-spacing: 1px;
		   -webkit-background-clip: text;
	  }

	  .countdown-line {
	    width: 26.4%;
		margin-left: 36.8%;
	    border-top: 2px solid #BEC8DF;
	  }

	  .countdown-center{
		  width: 80%;
		  height: 40%;
		  margin-left: 10%;
		  margin-top: 4%;
		  padding-top: 4%;
		  font-size: 100px;
		  font-family: OPPOSans-Bold, OPPOSans;
		  text-align: center;
		  font-weight: bold;
		  color: #4F3C1A;
		  line-height: 54px;
		  letter-spacing: 3px;
		  -webkit-background-clip: text;
	  }

	  .countdown-day{
		  width: 26.4%;
		  height: 21%;
		  margin-top: 4%;
		  margin-left: 36.8%;
		  padding-top: 4%;
		  font-size: 32px;
		  font-family: OPPOSans-Medium, OPPOSans;
		  font-weight: 500;
		  color: #878D9C;
		  line-height: 21%;
		  letter-spacing: 1px;
		  -webkit-background-clip: text;
	  }

  }
}


</style>
