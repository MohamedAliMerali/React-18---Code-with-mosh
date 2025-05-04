import { axios } from "@pipedream/platform";
export default defineComponent({
  props: {
    relink_url_shortener: {
      type: "app",
      app: "relink_url_shortener",
    },
  },
  async run({ steps, $ }) {
    const data = {
      url: `https://yoururl.com`,
    };
    return await axios($, {
      method: "post",
      url: `https://rel.ink/api/links/`,
      data,
    });
  },
});
