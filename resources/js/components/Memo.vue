<template>
  <div class="memo card">
    <div class="card-body">
      <div class="card-text">{{item.owner.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>