<template>
    <div class="message">
        {{ $t('menu.message') }}
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="less">
    .message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        font-size: 24px;
    }
</style>
