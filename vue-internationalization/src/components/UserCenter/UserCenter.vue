<template>
    <div class="user-center">
        {{ $t('menu.userCenter') }}
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="less">
    .user-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        font-size: 24px;
    }
</style>
