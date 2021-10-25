<template>
  <div>This is an about page.</div>
  Fetched data: {{ data }}
</template>

<script>
import { useQuery } from "../composables/query.js";
import { getExampleData } from "../api/example.js";

export default {
  name: "AboutPage",
  setup() {
    const { data } = useQuery("example", async () => {
      const { data: result } = await getExampleData();
      return result;
    });
    return { data };
  },
};
</script>
