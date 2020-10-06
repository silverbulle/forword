<template>
	<div class="sidebar">
		<div class="header">
			<div class="header-logo"></div>
			<div class="header-user">
				<div class="header-user-image"></div>
				<div class="header-user-name">
					<el-dropdown @command="handleCommand">
				      <span class="el-dropdown-link">
				        湖工电气<i class="el-icon-caret-bottom el-icon--right"></i>
				      </span>
				      <el-dropdown-menu slot="dropdown">
				        <el-dropdown-item command="退出">退出</el-dropdown-item>
				      </el-dropdown-menu>
				    </el-dropdown>
				</div>
			</div>
		</div>
		<div class="meau">
			<el-menu default-active="1" class="el-menu-vertical-demo" router="true">
				<el-menu-item index="Main"><i class="iconfont icon-lunbotu"></i>主页面</el-menu-item>
				<el-menu-item index="Auditing"><i class="iconfont icon-lunbotu"></i>上传文件</el-menu-item>
				<el-menu-item index="filedetail"><i class="iconfont icon-lunbotu"></i>文件详情查看</el-menu-item>
				<el-menu-item index="Senuphold"><i class="iconfont icon-lunbotu"></i>敏感词维护</el-menu-item>
				<el-menu-item index="Appuphold"><i class="iconfont icon-lunbotu"></i>附件类型维护</el-menu-item>
		        
		    </el-menu>
		</div>
	</div>
</template>

<script>
export default {
   	 	data () {
    return {

    }
  },
  methods: {
        		 handleCommand (command) {
		        this.$router.push('/login')
		     }
  }
}
</script>

<style>
	.el-dropdown-link{
		color: white;
		font-size: 18px;
	}
	.el-menu-item-group__title{
		height: 0px !important;
		padding: 0px !important;
	}
	.el-menu-vertical-demo,.el-submenu__title,.el-menu-item{
		color: white;
		border-radius: 0px;
		background-color: #354152;
	}
</style>
