<template>
    <div>
        <div class="alert alert-info"
            @load="$store.commit({type:'getRandomMemo'})">
        </div>
        <p>{{ $store.state.randomMemo }}</p>
    </div>
</template>

<script>
export default {
    name: 'PastMemo',
    //setup(){
    //    const data 
    //}
}
</script>