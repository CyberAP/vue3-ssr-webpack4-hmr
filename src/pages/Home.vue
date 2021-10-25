<template>
  This is a Homepage.
  <ExampleComponent />
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

const ExampleComponent = defineAsyncComponent(() =>
  import("../components/ExampleComponent.vue")
);

export default {
  name: "HomePage",
  components: {
    ExampleComponent,
  },
};
</script>
