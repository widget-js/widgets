<template>
	<view class="page flex-col">
		<view class="box_1_1 flex-col"></view>
		<view class="box_2_1 flex-col">
			<countDown></countDown>
		</view>
		<view class="box_3 flex-col">
			<el-form class="form1" label-width="2.8rem">
				<el-form-item label="组件名称">
					<el-input />
				</el-form-item>
				<el-form-item label="事项名称">
					<el-input />
				</el-form-item>
				<el-form-item label="目标日期">
					<el-input />
				</el-form-item>

				<el-form-item label="重复设置">
					<el-radio-group v-model="radio">
						<el-radio :label="3">每周</el-radio>
						<el-radio :label="6">每月</el-radio>
						<el-radio :label="9">每年</el-radio>
						<el-radio :label="12">每天</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="文字颜色">
					<el-select v-model="value1" class="m-2">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>

				<el-form-item label="背景颜色">
					<el-select v-model="value2" class="m-2">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>

			</el-form>
		</view>
		<view class="line flex-col"></view>
		<view class=".box_4 flex-col">
			<el-button class="cancel_btn">取消</el-button>
			<el-button type="primary" class="confrim_btn">保存</el-button>
		</view>
	</view>
</template>

<script>
	import 'element-plus/es/components/message/style/css'
	import {
		ElMessage
	} from 'element-plus'
	import countDown from './CountDownWidget'

	export default {
		components: {
			countDown
		},
		data() {
			return {
				radio: 3,
				formInline: {
					user: '',
					region: '',
				},
				options: [{
						value: 'Option1',
						label: 'Option1',
					},
					{
						value: 'Option2',
						label: 'Option2',
					},
					{
						value: 'Option3',
						label: 'Option3',
					},
					{
						value: 'Option4',
						label: 'Option4',
					},
					{
						value: 'Option5',
						label: 'Option5',
					},
				],
				value1: '',
				value2: '',
			};
		},
		methods: {
			onSubmit() {
			}
		},
	}
</script>

<style>
	html {
		font-size: 37.5px;
	}

	.page {
		position: relative;
		width: 12.8rem;
		height: 16.347rem;
		background: #F0F2F5;
		border-radius: 0.267rem;
		overflow: hidden;
	}

	.line {
		width: 11.95rem;
		border-top: 1px solid #DCDFE6;
		margin-top: 0.5rem;
		margin-left: 0.425rem;
		z-index: 1;
	}

	.box_1_1 {
		width: 12.8rem;
		height: 1.12rem;
		background: #409EFF;
	}

	.box_2_1 {
		padding-top: 0.53rem;
		left: 30%;
		width: 12.8rem;
		height: 4.56rem;
		position: relative;
	}

	.box_3 {
		padding-top: 0.85rem;
		padding-left: 0.53rem;
		width: 12.8rem;
		height: 8.48rem;
		z-index: 1;
	}

	.form1 {
		width: 12.8rem;
		height: 8.48rem;
		max-width: 11rem;
	}

	.box_4 {
		width: 12.8rem;
		height: 1.65rem;
		position: relative;
	}

	.cancel_btn {
		right: 3.2rem;
		float: right;
		width: 2rem;
		position: absolute;
		margin-top: 0.5rem;
	}

	.confrim_btn {
		right: 0.7rem;
		float: right;
		width: 2rem;
		position: absolute;
		margin-top: 0.5rem;
	}
</style>
