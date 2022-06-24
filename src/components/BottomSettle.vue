<template>
    <div class="bottomSettle-container">
        <div>
            <input type="checkbox" id="bottom" :checked="isAllSelect" @click="isAllOption" />
            <label for="bottom">全选</label>
        </div>

        <span>商品总价为 ￥{{totalPrice.toFixed(2)}}</span>
        <el-button type="primary" plain>结算： {{totalCount}}</el-button>
    </div>
</template>

<script>
export default {
    name: "BottomSettle",

    props: {
        // 接收是否全选状态
        isAllSelect: {
            type: Boolean,
            require: true
        },
        // 接收商品总价格
        totalPrice: {
            type: Number,
            require: true
        },
        // 接收商品总数
        totalCount: {
            type: Number,
            require: true
        }
    },
    methods: {
        isAllOption(e) {
            this.$emit('chageAllOption', e.target.checked)
        }
    }
};
</script>

<style lang="less" scoped>
.bottomSettle-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>