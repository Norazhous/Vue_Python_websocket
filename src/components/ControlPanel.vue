<template>
	<div class='container-fluid m-2 background-white border rounded'>

		<div>
			<PID />
		</div>
		<div id="buttons" class="row">

			<div class="col-3 offset-2">
				<!-- <button id="V1" class="button-lg button-primary" > V1 </button>  -->
				<!-- id="flexSwitchCheckDefault" in the input, and  for="flexSwitchCheckDefault" in the label-->
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" :checked="V1SwitchControllor"
						:disabled="V1SwitchDisabled" @click="valve1ColorChange()">
					<label class="form-check-label" :style="{ color: valve1Color }">V1 {{ V1state }}</label>
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" :checked="V2SwitchControllor"
						:disabled="V2SwitchDisabled" @click="valve2ColorChange()">
					<label class="form-check-label" :style="{ color: valve2Color }">V2 {{ V2state }}</label>
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" :checked="V3SwitchControllor"
						:disabled="V3SwitchDisabled" @click="valve3ColorChange()">
					<label class="form-check-label" :style="{ color: valve3Color }">V3 {{ V3state }}</label>
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" :checked="V4SwitchControllor"
						:disabled="V4SwitchDisabled" @click="valve4ColorChange()">
					<label class="form-check-label" :style="{ color: valve4Color }">V4 {{ V4state }}</label>
				</div>
			</div>

			<div class="col-3">
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" :checked="V5SwitchControllor"
						:disabled="V5SwitchDisabled" @click="valve5ColorChange()">
					<label class="form-check-label" :style="{ color: valve5Color }">V5 {{ V5state }}</label>
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" :checked="V6SwitchControllor"
						:disabled="V6SwitchDisabled" @click="valve6ColorChange()">
					<label class="form-check-label" :style="{ color: valve6Color }">V6 {{ V6state }}</label>
				</div>


				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" :checked="V7SwitchControllor"
						:disabled="V7SwitchDisabled" @click="valve7ColorChange()">
					<label class="form-check-label" :style="{ color: valve7Color }"> V7 {{ V7state }}</label>
				</div>

			</div>
			<div class="col-3">
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" :checked="W1SwitchControllor"
						:disabled="W1SwitchDisabled" @click="w1ColorChange()">
					<label class="form-check-label" :style="{ color: w1color }"> Fans {{ W1state }} </label>
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" :checked="COMPSwitchControllor"
						:disabled="COMPSwitchDisabled" @click="compColorChange()">
					<label class="form-check-label" :style="{ color: compcolor }"> Compressor {{ COMPstate }}</label>
				</div>
			</div>



		</div>


	</div>
</template>

<script>
import PID from "./PID.vue"
// import dataTestStore from "../modules/ACON_dataTestStore"
//import Tooltip from "./Tooltip.vue";
import { mapGetters, mapActions } from 'vuex';

export default {
	name: "ControlPanel",
	components: {
		//Tooltip,
		PID,

	},
	props: {
		url: String,
	},
	data() {
		return {
			dataSocket: null,
			// canvas: null,

			V1state: "OFF",
			V1SwitchControllor: false,
			V1SwitchDisabled: false,
			V1msg: "V1 error",

			V2state: "OFF",
			V2SwitchControllor: false,
			V2SwitchDisabled: false,
			V2msg: "V2 error",

			V3state: "OFF",
			V3SwitchControllor: false,
			V3SwitchDisabled: false,
			V3msg: "V3 error",

			V4state: "OFF",
			V4SwitchControllor: false,
			V4SwitchDisabled: false,
			V4msg: "V4 error",

			V5state: "OFF",
			V5SwitchControllor: false,
			V5SwitchDisabled: false,
			V5msg: "V5 error",

			V6state: "OFF",
			V6SwitchControllor: false,
			V6SwitchDisabled: false,
			V6msg: "V6 error",

			V7state: "OFF",
			V7SwitchControllor: false,
			V7SwitchDisabled: false,
			V7msg: "V7 error",

			W1state: "OFF",
			W1SwitchControllor: false,
			W1SwitchDisabled: false,
			W1msg: "Fans error",

			COMPstate: "OFF",
			COMPSwitchControllor: false,
			COMPSwitchDisabled: false,
			COMPmsg: "Fans error",


		}
	},
	computed: {
		...mapGetters([
			'getDataURLObtained',
		]),
		valve1Color() {
			return this.$store.state.ui.v1color;
		},
		valve2Color() {
			return this.$store.state.ui.v2color;
		},
		valve3Color() {
			return this.$store.state.ui.v3color;
		},
		valve4Color() {
			return this.$store.state.ui.v4color;
		},
		valve5Color() {
			return this.$store.state.ui.v5color;
		},
		valve6Color() {
			return this.$store.state.ui.v6color;
		},
		valve7Color() {
			return this.$store.state.ui.v7color;
		},
		w1color() {
			return this.$store.state.ui.w1color;
		},
		compcolor() {
			return this.$store.state.ui.compcolor;
		},




	},
	watch: {
		url() {
			try {
				if (this.url != '' && this.getDataURLObtained) {
					this.connect();
					console.log("connected"+ this.obj) 

				} else {
					console.log('disconnecting: ' + this.url);
				}

			} catch (e) {
				console.log(e);
			}


		},


	},
	mounted() {



	},
	methods: {
		...mapActions([
			'setV1color',// set the color of the valve,setV1color(2)-waiting, setV1color(1)-on,setV1color(0)-off
			'SENDV1CONTROL',//send command to server,SENDV1CONTROL(1)-open,SENDV1CONTROL(1)-close
			'setV2color',
			'SENDV2CONTROL',
			'setV3color',
			'SENDV3CONTROL',
			'setV4color',
			'SENDV4CONTROL',
			'setV5color',
			'SENDV5CONTROL',
			'setV6color',
			'SENDV6CONTROL',
			'setV7color',
			'SENDV7CONTROL',
			'setW1color',
			'SENDW1CONTROL',
			// 'setW2color',
			'setCOMPcolor',
			'SENDCOMPCONTROL',
		]),

		//send command first, and the state changes to opening. waith 1 -2 second, check the state again, if the state become opened, then UI change. otherwise, alert and UI keep original.
		valve1ColorChange() {

			if (this.V1SwitchControllor == false && this.$store.state.command.V1 == 0) {

				this.setV1color(2);
				this.V1state = "opening";
				this.SENDV1CONTROL(1);
				this.V1msg = "V1opening";
				console.log(this.V1msg);
				this.V1SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V1 == 1) {
						this.V1SwitchDisabled = false;
						this.setV1color(1);
						this.V1state = "ON";
						this.V1msg = "V1opened";
						console.log(this.V1msg);
						this.V1SwitchControllor = true;
					}
					else if (this.$store.state.command.V1 == 0) {
						this.V1SwitchDisabled = false;
						this.setV1color(0);
						this.V1state = "OFF";
						this.V1msg = "V1_not_open_success";
						console.log(this.V1msg);
						this.V1SwitchControllor = false;
					}
				}, 1000);

			} else if (this.V1SwitchControllor == true && this.$store.state.command.V1 == 1) {

				this.setV1color(2);
				this.V1state = "closing";
				this.SENDV1CONTROL(0);
				this.V1msg = "V1closing";
				console.log(this.V1msg);
				this.V1SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V1 == 0) {
						this.V1SwitchDisabled = false;
						this.setV1color(0);
						this.V1state = "OFF";
						this.V1msg = "V1closed";
						console.log(this.V1msg);
						this.V1SwitchControllor = false;
					}
					else if (this.$store.state.command.V1 == 1) {
						this.V1SwitchDisabled = false;
						this.setV1color(1);
						this.V1state = "ON";
						this.V1msg = "V1_not_close_success";
						console.log(this.V1msg);
						this.V1SwitchControllor = true;
					}
				}, 1000);

			} else {
				alert(this.V1msg);
				console.log("error:" + "V1 is" + this.V1state + "; its code is" + this.$store.state.command.V1 + ";" + "V2 is" + this.V2state + "; its code is" + this.$store.state.command.V2 + ";"
					+ "V3 is" + this.V3state + "; its code is" + this.$store.state.command.V3 + ";" + "V4 is" + this.V4state + "; its code is" + this.$store.state.command.V4 + ";" + "V5 is" + this.V5state + "; its code is" + this.$store.state.command.V5 + ";"
					+ "V6 is" + this.V6state + "; its code is" + this.$store.state.command.V6 + ";" + "V7 is" + this.V7state + "; its code is" + this.$store.state.command.V7 + ";");
			}
		},


		valve2ColorChange() {

			if (this.V2SwitchControllor == false && this.$store.state.command.V2 == 0) {

				this.setV2color(2);
				this.V2state = "opening";
				this.SENDV2CONTROL(1);
				this.V2msg = "V2opening";
				console.log(this.V2msg);
				this.V2SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V2 == 1) {
						this.V2SwitchDisabled = false;
						this.setV2color(1);
						this.V2state = "ON";
						this.V2msg = "V2opened";
						console.log(this.V2msg);
						this.V2SwitchControllor = true;
					}
					else if (this.$store.state.command.V2 == 0) {
						this.V2SwitchDisabled = false;
						this.setV2color(0);
						this.V2state = "OFF";
						this.V2msg = "V2_not_open_success";
						console.log(this.V2msg);
						this.V2SwitchControllor = false;
					}
				}, 1000);

			} else if (this.V2SwitchControllor == true && this.$store.state.command.V2 == 1) {

				this.setV2color(2);
				this.V2state = "closing";
				this.SENDV2CONTROL(0);
				this.V2msg = "V2closing";
				console.log(this.V2msg);
				this.V2SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V2 == 0) {
						this.V2SwitchDisabled = false;
						this.setV2color(0);
						this.V2state = "OFF";
						this.V2msg = "V2closed";
						console.log(this.V2msg);
						this.V2SwitchControllor = false;
					}
					else if (this.$store.state.command.V2 == 1) {
						this.V2SwitchDisabled = false;
						this.setV2color(1);
						this.V2state = "ON";
						this.V2msg = "V2_not_close_success";
						console.log(this.V2msg);
						this.V2SwitchControllor = true;
					}
				}, 1000);

			} else {
				alert(this.V2msg);
				console.log("error:" + "V1 is" + this.V1state + "; its code is" + this.$store.state.command.V1 + ";" + "V2 is" + this.V2state + "; its code is" + this.$store.state.command.V2 + ";"
					+ "V3 is" + this.V3state + "; its code is" + this.$store.state.command.V3 + ";" + "V4 is" + this.V4state + "; its code is" + this.$store.state.command.V4 + ";" + "V5 is" + this.V5state + "; its code is" + this.$store.state.command.V5 + ";"
					+ "V6 is" + this.V6state + "; its code is" + this.$store.state.command.V6 + ";" + "V7 is" + this.V7state + "; its code is" + this.$store.state.command.V7 + ";");
			}
		},


		valve3ColorChange() {

			if (this.V3SwitchControllor == false && this.$store.state.command.V3 == 0) {

				this.setV3color(2);
				this.V3state = "opening";
				this.SENDV3CONTROL(1);
				this.V3msg = "V3opening";
				console.log(this.V3msg);
				this.V3SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V3 == 1) {
						this.V3SwitchDisabled = false;
						this.setV3color(1);
						this.V3state = "ON";
						this.V3msg = "V3opened";
						console.log(this.V3msg);
						this.V3SwitchControllor = true;
					}
					else if (this.$store.state.command.V3 == 0) {
						this.V3SwitchDisabled = false;
						this.setV3color(0);
						this.V3state = "OFF";
						this.V3msg = "V3_not_open_success";
						console.log(this.V3msg);
						this.V3SwitchControllor = false;
					}
				}, 1000);

			} else if (this.V3SwitchControllor == true && this.$store.state.command.V3 == 1) {

				this.setV3color(2);
				this.V3state = "closing";
				this.SENDV3CONTROL(0);
				this.V3msg = "V3closing";
				console.log(this.V3msg);
				this.V3SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V3 == 0) {
						this.V3SwitchDisabled = false;
						this.setV3color(0);
						this.V3state = "OFF";
						this.V3msg = "V3closed";
						console.log(this.V3msg);
						this.V3SwitchControllor = false;
					}
					else if (this.$store.state.command.V3 == 1) {
						this.V3SwitchDisabled = false;
						this.setV3color(1);
						this.V3state = "ON";
						this.V3msg = "V3_not_close_success";
						console.log(this.V3msg);
						this.V3SwitchControllor = true;
					}
				}, 1000);

			} else {
				alert(this.V3msg);
				console.log("error:" + "V1 is" + this.V1state + "; its code is" + this.$store.state.command.V1 + ";" + "V2 is" + this.V2state + "; its code is" + this.$store.state.command.V2 + ";"
					+ "V3 is" + this.V3state + "; its code is" + this.$store.state.command.V3 + ";" + "V4 is" + this.V4state + "; its code is" + this.$store.state.command.V4 + ";" + "V5 is" + this.V5state + "; its code is" + this.$store.state.command.V5 + ";"
					+ "V6 is" + this.V6state + "; its code is" + this.$store.state.command.V6 + ";" + "V7 is" + this.V7state + "; its code is" + this.$store.state.command.V7 + ";");
			}
		},

		valve4ColorChange() {

			if (this.V4SwitchControllor == false && this.$store.state.command.V4 == 0) {

				this.setV4color(2);
				this.V4state = "opening";
				this.SENDV4CONTROL(1);
				this.V4msg = "V4opening";
				console.log(this.V4msg);
				this.V4SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V4 == 1) {
						this.V4SwitchDisabled = false;
						this.setV4color(1);
						this.V4state = "ON";
						this.V4msg = "V4opened";
						console.log(this.V4msg);
						this.V4SwitchControllor = true;
					}
					else if (this.$store.state.command.V4 == 0) {
						this.V4SwitchDisabled = false;
						this.setV4color(0);
						this.V4state = "OFF";
						this.V4msg = "V4_not_open_success";
						console.log(this.V4msg);
						this.V4SwitchControllor = false;
					}
				}, 1000);

			} else if (this.V4SwitchControllor == true && this.$store.state.command.V4 == 1) {

				this.setV4color(2);
				this.V4state = "closing";
				this.SENDV4CONTROL(0);
				this.V4msg = "V4closing";
				console.log(this.V4msg);
				this.V4SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V4 == 0) {
						this.V4SwitchDisabled = false;
						this.setV4color(0);
						this.V4state = "OFF";
						this.V4msg = "V4closed";
						console.log(this.V4msg);
						this.V4SwitchControllor = false;
					}
					else if (this.$store.state.command.V4 == 1) {
						this.V4SwitchDisabled = false;
						this.setV4color(1);
						this.V4state = "ON";
						this.V4msg = "V4_not_close_success";
						console.log(this.V4msg);
						this.V4SwitchControllor = true;
					}
				}, 1000);

			} else {
				alert(this.V4msg);
				console.log("error:" + "V1 is" + this.V1state + "; its code is" + this.$store.state.command.V1 + ";" + "V2 is" + this.V2state + "; its code is" + this.$store.state.command.V2 + ";"
					+ "V3 is" + this.V3state + "; its code is" + this.$store.state.command.V3 + ";" + "V4 is" + this.V4state + "; its code is" + this.$store.state.command.V4 + ";" + "V5 is" + this.V5state + "; its code is" + this.$store.state.command.V5 + ";"
					+ "V6 is" + this.V6state + "; its code is" + this.$store.state.command.V6 + ";" + "V7 is" + this.V7state + "; its code is" + this.$store.state.command.V7 + ";");
			}
		},


		valve5ColorChange() {

			if (this.V5SwitchControllor == false && this.$store.state.command.V5 == 0) {

				this.setV5color(2);
				this.V5state = "opening";
				this.SENDV5CONTROL(1);
				this.V5msg = "V5opening";
				console.log(this.V5msg);
				this.V5SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V5 == 1) {
						this.V5SwitchDisabled = false;
						this.setV5color(1);
						this.V5state = "ON";
						this.V5msg = "V5opened";
						console.log(this.V5msg);
						this.V5SwitchControllor = true;
					}
					else if (this.$store.state.command.V5 == 0) {
						this.V5SwitchDisabled = false;
						this.setV5color(0);
						this.V5state = "OFF";
						this.V5msg = "V5_not_open_success";
						console.log(this.V5msg);
						this.V5SwitchControllor = false;
					}
				}, 1000);

			} else if (this.V5SwitchControllor == true && this.$store.state.command.V5 == 1) {

				this.setV5color(2);
				this.V5state = "closing";
				this.SENDV5CONTROL(0);
				this.V5msg = "V5closing";
				console.log(this.V5msg);
				this.V5SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V5 == 0) {
						this.V5SwitchDisabled = false;
						this.setV5color(0);
						this.V5state = "OFF";
						this.V5msg = "V5closed";
						console.log(this.V5msg);
						this.V5SwitchControllor = false;
					}
					else if (this.$store.state.command.V5 == 1) {
						this.V5SwitchDisabled = false;
						this.setV5color(1);
						this.V5state = "ON";
						this.V5msg = "V5_not_close_success";
						console.log(this.V5msg);
						this.V5SwitchControllor = true;
					}
				}, 1000);

			} else {
				alert(this.V5msg);
				console.log("error:" + "V1 is" + this.V1state + "; its code is" + this.$store.state.command.V1 + ";" + "V2 is" + this.V2state + "; its code is" + this.$store.state.command.V2 + ";"
					+ "V3 is" + this.V3state + "; its code is" + this.$store.state.command.V3 + ";" + "V4 is" + this.V4state + "; its code is" + this.$store.state.command.V4 + ";" + "V5 is" + this.V5state + "; its code is" + this.$store.state.command.V5 + ";"
					+ "V6 is" + this.V6state + "; its code is" + this.$store.state.command.V6 + ";" + "V7 is" + this.V7state + "; its code is" + this.$store.state.command.V7 + ";");
			}
		},



		valve6ColorChange() {

			if (this.V6SwitchControllor == false && this.$store.state.command.V6 == 0) {

				this.setV6color(2);
				this.V6state = "opening";
				this.SENDV6CONTROL(1);
				this.V6msg = "V6opening";
				console.log(this.V6msg);
				this.V6SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V6 == 1) {
						this.V6SwitchDisabled = false;
						this.setV6color(1);
						this.V6state = "ON";
						this.V6msg = "V6opened";
						console.log(this.V6msg);
						this.V6SwitchControllor = true;
					}
					else if (this.$store.state.command.V6 == 0) {
						this.V6SwitchDisabled = false;
						this.setV6color(0);
						this.V6state = "OFF";
						this.V6msg = "V6_not_open_success";
						console.log(this.V6msg);
						this.V6SwitchControllor = false;
					}
				}, 1000);

			} else if (this.V6SwitchControllor == true && this.$store.state.command.V6 == 1) {

				this.setV6color(2);
				this.V6state = "closing";
				this.SENDV6CONTROL(0);
				this.V6msg = "V6closing";
				console.log(this.V6msg);
				this.V6SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V6 == 0) {
						this.V6SwitchDisabled = false;
						this.setV6color(0);
						this.V6state = "OFF";
						this.V6msg = "V6closed";
						console.log(this.V6msg);
						this.V6SwitchControllor = false;
					}
					else if (this.$store.state.command.V6 == 1) {
						this.V6SwitchDisabled = false;
						this.setV6color(1);
						this.V6state = "ON";
						this.V6msg = "V6_not_close_success";
						console.log(this.V6msg);
						this.V6SwitchControllor = true;
					}
				}, 1000);

			} else {
				alert(this.V6msg);
				console.log("error:" + "V1 is" + this.V1state + "; its code is" + this.$store.state.command.V1 + ";" + "V2 is" + this.V2state + "; its code is" + this.$store.state.command.V2 + ";"
					+ "V3 is" + this.V3state + "; its code is" + this.$store.state.command.V3 + ";" + "V4 is" + this.V4state + "; its code is" + this.$store.state.command.V4 + ";" + "V5 is" + this.V5state + "; its code is" + this.$store.state.command.V5 + ";"
					+ "V6 is" + this.V6state + "; its code is" + this.$store.state.command.V6 + ";" + "V7 is" + this.V7state + "; its code is" + this.$store.state.command.V7 + ";");
			}
		},



		valve7ColorChange() {

			if (this.V7SwitchControllor == false && this.$store.state.command.V7 == 0) {

				this.setV7color(2);
				this.V7state = "opening";
				this.SENDV7CONTROL(1);
				this.V7msg = "V7opening";
				console.log(this.V7msg);
				this.V7SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V7 == 1) {
						this.V7SwitchDisabled = false;
						this.setV7color(1);
						this.V7state = "ON";
						this.V7msg = "V7opened";
						console.log(this.V7msg);
						this.V7SwitchControllor = true;
					}
					else if (this.$store.state.command.V7 == 0) {
						this.V7SwitchDisabled = false;
						this.setV7color(0);
						this.V7state = "OFF";
						this.V7msg = "V7_not_open_success";
						console.log(this.V7msg);
						this.V7SwitchControllor = false;
					}
				}, 1000);

			} else if (this.V7SwitchControllor == true && this.$store.state.command.V7 == 1) {

				this.setV7color(2);
				this.V7state = "closing";
				this.SENDV7CONTROL(0);
				this.V7msg = "V7closing";
				console.log(this.V7msg);
				this.V7SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.V7 == 0) {
						this.V7SwitchDisabled = false;
						this.setV7color(0);
						this.V7state = "OFF";
						this.V7msg = "V7closed";
						console.log(this.V7msg);
						this.V7SwitchControllor = false;
					}
					else if (this.$store.state.command.V7 == 1) {
						this.V7SwitchDisabled = false;
						this.setV7color(1);
						this.V7state = "ON";
						this.V7msg = "V7_not_close_success";
						console.log(this.V7msg);
						this.V7SwitchControllor = true;
					}
				}, 1000);

			} else {
				alert(this.V7msg);
				console.log("error:" + "V1 is" + this.V1state + "; its code is" + this.$store.state.command.V1 + ";" + "V2 is" + this.V2state + "; its code is" + this.$store.state.command.V2 + ";"
					+ "V3 is" + this.V3state + "; its code is" + this.$store.state.command.V3 + ";" + "V4 is" + this.V4state + "; its code is" + this.$store.state.command.V4 + ";" + "V5 is" + this.V5state + "; its code is" + this.$store.state.command.V5 + ";"
					+ "V6 is" + this.V6state + "; its code is" + this.$store.state.command.V6 + ";" + "V7 is" + this.V7state + "; its code is" + this.$store.state.command.V7 + ";");
			}
		},




		w1ColorChange() {

			if (this.W1SwitchControllor == false && this.$store.state.command.W1 == 0) {

				this.setW1color(2);
				this.W1state = "opening";
				this.SENDW1CONTROL(1);
				this.W1msg = "Fans opening";
				console.log(this.W1msg);
				this.W1SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.W1 == 1) {
						this.W1SwitchDisabled = false;
						this.setW1color(1);
						this.W1state = "ON";
						this.W1msg = "Fans opened";
						console.log(this.W1msg);
						this.W1SwitchControllor = true;
					}
					else if (this.$store.state.command.W1 == 0) {
						this.W1SwitchDisabled = false;
						this.setW1color(0);
						this.W1msg = "OFF";
						this.W1msg = "Fans_not_open_success";
						console.log(this.W1msg);
						this.W1SwitchControllor = false;
					}
				}, 1000);

			} else if (this.W1SwitchControllor == true && this.$store.state.command.W1 == 1) {

				this.setW1color(2);
				this.W1state = "closing";
				this.SENDW1CONTROL(0);
				this.W1msg = "Fans closing";
				console.log(this.W1msg);
				this.W1SwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.W1 == 0) {
						this.W1SwitchDisabled = false;
						this.setW1color(0);
						this.W1state = "OFF";
						this.W1msg = "Fans closed";
						console.log(this.W1msg);
						this.W1SwitchControllor = false;
					}
					else if (this.$store.state.command.W1 == 1) {
						this.W1SwitchDisabled = false;
						this.setW1color(1);
						this.W1state = "ON";
						this.W1msg = "Fans_not_close_success";
						console.log(this.W1msg);
						this.W1SwitchControllor = true;
					}
				}, 1000);

			} else {
				alert(this.W1msg + this.$store.state.command.W1 + this.W1SwitchControllor);
				console.log("error:" + "V1 is" + this.V1state + "; its code is" + this.$store.state.command.V1 + ";" + "V2 is" + this.V2state + "; its code is" + this.$store.state.command.V2 + ";"
					+ "V3 is" + this.V3state + "; its code is" + this.$store.state.command.V3 + ";" + "V4 is" + this.V4state + "; its code is" + this.$store.state.command.V4 + ";" + "V5 is" + this.V5state + "; its code is" + this.$store.state.command.V5 + ";"
					+ "V6 is" + this.V6state + "; its code is" + this.$store.state.command.V6 + ";" + "V7 is" + this.V7state + "; its code is" + this.$store.state.command.V7 + ";"
					+ "W1 is" + this.W1state + "; its code is" + this.$store.state.command.W1 + ";");
			}
		},




		compColorChange() {

			if (this.COMPSwitchControllor == false && this.$store.state.command.Comp == 0) {

				this.setCOMPcolor(2);
				this.COMPstate = "opening";
				this.SENDCOMPCONTROL(1);
				this.COMPmsg = "Compressor opening";
				console.log(this.COMPmsg);
				this.COMPSwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.Comp == 1) {
						this.COMPSwitchDisabled = false;
						this.setCOMPcolor(1);
						this.COMPstate = "ON";
						this.COMPmsg = "Compressor opened";
						console.log(this.COMPmsg);
						this.COMPSwitchControllor = true;
					}
					else if (this.$store.state.command.Comp == 0) {
						this.COMPSwitchDisabled = false;
						this.setCOMPcolor(0);
						this.COMPmsg = "OFF";
						this.COMPmsg = "Comperssor_not_open_success";
						console.log(this.COMPmsg);
						this.COMPSwitchControllor = false;
					}
				}, 1000);

			} else if (this.COMPSwitchControllor == true && this.$store.state.command.Comp == 1) {

				this.setCOMPcolor(2);
				this.COMPstate = "closing";
				this.SENDCOMPCONTROL(0);
				this.COMPmsg = "Compressor closing";
				console.log(this.COMPmsg);
				this.COMPSwitchDisabled = true;

				setTimeout(() => {
					if (this.$store.state.command.Comp == 0) {
						this.COMPSwitchDisabled = false;
						this.setCOMPcolor(0);
						this.COMPstate = "OFF";
						this.COMPmsg = "Compressor closed";
						console.log(this.COMPmsg);
						this.COMPSwitchControllor = false;
					}
					else if (this.$store.state.command.Comp == 1) {
						this.COMPSwitchDisabled = false;
						this.setCOMPcolor(1);
						this.COMPstate = "ON";
						this.COMPmsg = "Compressor_not_close_success";
						console.log(this.COMPmsg);
						this.COMPSwitchControllor = true;
					}
				}, 1000);

			} else {
				alert(this.COMPmsg + this.$store.state.command.Comp + this.COMPSwitchControllor);
				console.log("error:" + "V1 is" + this.V1state + "; its code is" + this.$store.state.command.V1 + ";" + "V2 is" + this.V2state + "; its code is" + this.$store.state.command.V2 + ";"
					+ "V3 is" + this.V3state + "; its code is" + this.$store.state.command.V3 + ";" + "V4 is" + this.V4state + "; its code is" + this.$store.state.command.V4 + ";" + "V5 is" + this.V5state + "; its code is" + this.$store.state.command.V5 + ";"
					+ "V6 is" + this.V6state + "; its code is" + this.$store.state.command.V6 + ";" + "V7 is" + this.V7state + "; its code is" + this.$store.state.command.V7 + ";"
					+ "W1 is" + this.W1state + "; its code is" + this.$store.state.command.W1 + ";");
			}
		},






		// test() {
		// 	console.log('SECOND');
		// },

		connect() {

			let _this = this;

			this.dataSocket = new WebSocket(this.url);
			//console.log(this.dataSocket);
			this.$store.dispatch('setDataSocket', this.dataSocket);

			//let dataOpen = false;
			var delay = 0;
			let delay_sum = 0;
			// let avgDelay = 0;
			// let delays = [];
			var messageCount = 0;
			let a;
			let b;
			let debug = false;
			// let wrapEncoder = true;

			var initialSamplingCount = 1200 // 2 mins at 10Hz
			var delayWeightingFactor = 60  // 1 minute drift in 1 hour
			// let encoderPPR = 2400

			let responsiveSmoothie = true;
			let thisTime;

			// var chart = new SmoothieChart({ responsive: responsiveSmoothie, millisPerPixel: 10, grid: { fillStyle: '#ffffff' }, interpolation: "linear", maxValue: 135, minValue: -135, labels: { fillStyle: '#0024ff', precision: 0 } }); //interpolation:'linear
			// this.canvas = document.getElementById("smoothie-chart");
			// let series = new TimeSeries();
			// chart.addTimeSeries(series, { lineWidth: 2, strokeStyle: '#0024ff' });
			// chart.streamTo(this.canvas, 0);

			this.dataSocket.onopen = () => {
				console.log('OPENED');

			};

			this.dataSocket.onerror = () => {
				console.log('ws error');

			};


			this.dataSocket.onmessage = (event) => {
				console.log(event.data);

				try {
					
					//delay of timestamp from device and UI

					var obj = JSON.parse(event.data);
					
					var msgTime = obj.timestamp;//timestamp
					var thisDelay = new Date().getTime() - msgTime;
					//var enc = obj.enc;

					// Measure data from refrigeration
					var PS1 = obj.sensors.pressure.PS1;
					var PS2 = obj.sensors.pressure.PS2;
					var PS3 = obj.sensors.pressure.PS3;
					var TS1 = obj.sensors.temperature.TS1;
					var TS2 = obj.sensors.temperature.TS2;
					var TS3 = obj.sensors.temperature.TS3;
					var TS4 = obj.sensors.temperature.TS4;
					var TS5 = obj.sensors.temperature.TS5;
					var flow = obj.sensors.misc.flow;
					var power = obj.sensors.misc.power;
					var TSA = obj.sensors.misc.TSA;
					var PSA = obj.sensors.misc.PSA;
					var HSA = obj.sensors.misc.HSA;

					//controller data from refrigeration
					var V1 = obj.valves.V1;
					var V2 = obj.valves.V2;
					var V3 = obj.valves.V3;
					var V4 = obj.valves.V4;
					var V5 = obj.valves.V5;
					var V6 = obj.valves.V6;
					var V7 = obj.valves.V7;
					// var V8 = obj.valves.V8;
					var W1 = obj.relays.W1; //fan1
					var W2 = obj.relays.W2; //fan2
					var comp = obj.relays.comp; //compressor

					//check the Data obj:{enc: -204, time: 867251805}
					//enc: -204 time: 867251805
					console.log("0" + obj);
					if (messageCount == 0) {
						_this.$store.dispatch('setStartTime', msgTime);
						delay = thisDelay
						delay_sum += thisDelay;
					} else {
						if (!isNaN(thisDelay)) {
							delay_sum += thisDelay;
							delay = delay_sum / (messageCount + 1);
						} else {
							delay_sum += delay;
							delay = delay_sum / (messageCount + 1);

						}

					}



					a = 1 / delayWeightingFactor
					b = 1 - a


					if (messageCount < initialSamplingCount) {
						thisDelay = ((delay * messageCount) + thisDelay) / (messageCount + 1)
					} else {
						thisDelay = (delay * b) + (thisDelay * a)
					}

					messageCount += 1

					//https://stackoverflow.com/questions/4633177/c-how-to-wrap-a-float-to-the-interval-pi-pi
					//if (wrapEncoder) { //wrap and convert to degrees
					// enc = Math.atan2(Math.sin(obj.enc / (encoderPPR / 2) * Math.PI), Math.cos(obj.enc / (encoderPPR / 2) * Math.PI)) / Math.PI * 180
					// enc = Math.min(135, enc)
					// enc = Math.max(-135, enc)

					// check om message function
					//console.log("1"+obj);
					//}
					//else { //convert to degrees only
					// enc = enc * 360.0 / encoderPPR;
					// console.log(obj);
					//}

					thisTime = msgTime + thisDelay

					if (!isNaN(thisTime) && !isNaN(PS1)) {
						series.append(msgTime + thisDelay, PS1) // for chart

						//Calculate angular velocity using new data sent through as well as currently stored values - before updating those values
						// let values = { theta_1: enc * Math.PI / 180, theta_0: _this.$store.getters.getCurrentAngle, t_1: msgTime, t_0: _this.$store.getters.getCurrentTime }
						// _this.$store.dispatch('setCurrentAngVel', values)
						// _this.$store.dispatch('setCurrentAngle', enc * Math.PI / 180);		//for output graph, convert to radians
						// _this.$store.dispatch('setCurrentTime', msgTime);			//for output graph

						//dispatch value to rawdatastore_sensors
						_this.$store.dispatch('SETPS1_value', PS1);
						_this.$store.dispatch('SETPS2_value', PS2);
						_this.$store.dispatch('SETPS3_value', PS3);
						_this.$store.dispatch('SETTS1_value', TS1);
						_this.$store.dispatch('SETTS2_value', TS2);
						_this.$store.dispatch('SETTS3_value', TS3);
						_this.$store.dispatch('SETTS4_value', TS4);
						_this.$store.dispatch('SETTS5_value', TS5);
						_this.$store.dispatch('SETFlow_value', flow);
						_this.$store.dispatch('SETPower_value', power);
						_this.$store.dispatch('SETTSA_value', TSA);
						_this.$store.dispatch('SETPSA_value', PSA);
						_this.$store.dispatch('SETHSA_value', HSA);
						//dispatch value to rawdatastore_controllers
						_this.$store.dispatch('SETV1', V1);
						_this.$store.dispatch('SETV2', V2);
						_this.$store.dispatch('SETV3', V3);
						_this.$store.dispatch('SETV4', V4);
						_this.$store.dispatch('SETV5', V5);
						_this.$store.dispatch('SETV6', V6);
						_this.$store.dispatch('SETV7', V7);
						// _this.$store.dispatch('SETV8',V8);
						_this.$store.dispatch('SETW1', W1);
						_this.$store.dispatch('SETW2', W2);
						_this.$store.dispatch('SETComp', comp);

						_this.$store.dispatch('setCurrentTime', msgTime);			//for output graph


						console.log("2" + obj);
						if (debug) {
							console.log(delay, thisDelay, msgTime, enc)
						}
					}
					else {
						if (debug) {
							console.log("NaN so not logging to smoothie", delay, thisDelay, msgTime, enc)
						}
					}

				} catch (e) {
					if (debug) {
						console.log(e)
					}
				}
			}



			window.addEventListener('keydown', this.hotkey, false);
			//window.addEventListener('pagehide', this.free);				//closing window
			//window.addEventListener('beforeunload', this.free);			//refreshing page, changing URL


		},

	},
}




</script>

<style scoped>
#smoothie-chart {
	width: 100%;
	height: 120px;
}

.slidecontainer {
	width: 100%;
	/* Width of the outside container */
}

.slider {
	/* -webkit-appearance: none; */
	width: 100%;
	height: 15px;
	border-radius: 5px;
	background: #d3d3d3;
	outline: none;
	opacity: 0.7;
	-webkit-transition: .2s;
	transition: opacity .2s;
	cursor: pointer;
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: #1433BA;
	/* Persian Blue */
	cursor: grab;
}

.slider::-moz-range-thumb {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: #1433BA;
	/* Persian Blue */
	cursor: grab;
}

/* Mouse-over effects */
.slider:hover {
	opacity: 1;
	/* Fully shown on mouse-over */
}

.column {
	float: left;
	width: 50%;
}


.sliderlabel {
	text-align: left;
}

.column1-4 {
	float: left;
	width: 30%;
}

.column2-4 {
	float: left;
	width: 40%;
}

.column3-4 {
	float: left;
	width: 75%;
}

.column1-3 {
	float: left;
	width: 33.3%;
}

.column2-3 {
	float: left;
	width: 66.6%;
}

.row {
	margin-top: 12px;
}

/* Clear floats after the columns */
.row:after {
	content: "";
	display: table;
	clear: both;
}
</style>