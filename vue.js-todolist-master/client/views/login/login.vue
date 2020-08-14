<template>
  <div>login</div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      text: ''
    }
  },
  mounted () {
    console.log(this.id)
  }
}
</script>
