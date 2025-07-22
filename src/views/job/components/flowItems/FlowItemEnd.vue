<template>
    <div >
<!--        <div style="font-size:20px;color: rgb(107, 104, 104)" v-show="!isDetail">-->
<!--        训练结束...-->
<!--        </div>-->
        <el-result icon="success" title="训练结束" subTitle="">
          <template slot="extra">
            <a href="http://127.0.0.1:9527/#/test/index">点击前往测试</a>
          </template>
        </el-result>
    </div>

</template>

<script>

export default {
    name: 'FlowItemEnd',
    props: {
        isDetail:{
            default: false
        }
    }
}
</script>

<style>

</style>
