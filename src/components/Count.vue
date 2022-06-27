<template>
    <div class="count-container">
        <el-input-number
            v-model="num"
            @change="handleChange"
            :min="1"
            :max="100"
            label="描述文字"
            size="mini"
        ></el-input-number>
    </div>
</template>

<script>
export default {
    name: "Count",
    props: {
        // 接收商品原数量
        countNum: {
            type: Number,
            require: true
        },
        countId: {
            type: Number,
            require: true
        }
    },
    data() {
        return {
            num: 1
        };
    },
    methods: {
        // 传值给后台方法
        handleChange(value) {
            let obj = {
                id: this.countId,
                num: value
            }
            // console.log(obj);
            this.$emit('countChange', obj)
        },
        // 设置初始num值为后台数据的值
        initNum() {
            this.num = this.countNum
        }
    },
    created() {
        this.initNum()
    }
};
</script>

<style lang="less" scoped>
.el-input-number--mini {
    width: 100px;
}
</style>